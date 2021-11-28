import express from 'express';
import debug from 'debug';
import appService from '../service/app.service';
import sendRabbitMsg from '../utils/producer';
import { CreateTransactionDto } from '../utils/dto';

const log: debug.IDebugger = debug('app:app-controller');
/** Abstracts the processing of requests from the route configuration
 * @returns new AppController()
  */
class AppController {
    /** Handle requests to get all transactions
     * @returns transactions, status 200
     */
    async fetchTransactions(req: express.Request, res: express.Response) {
        const transactions = await appService.getAll(20, 0);
        res.status(200).send(transactions);
    };

    /** add new a transaction to the database
     * @returns transactionId, status 201
     */
    async addTransaction(payload: CreateTransactionDto) {
        const transaction = await appService.create(payload);
        log(`Return the saved transaction ${transaction}`);
        return { message: 'Transaction saved!' };
    }

    /** Receive the order and initiate payment request 
     * send details of order to rabbitMq queue if payment
     * is successful
     */
    async receiveOrder(req: express.Request, res: express.Response) {
        let payload = req.body;
        log(`Received payload of ${payload} and initiated payment request`);

        // in a real world application the rabbitMQ msg will not be sent until
        // a response is received from the payment gateway being used
        sendRabbitMsg('insertTransaction', JSON.stringify(payload));
        return res.status(200).json({ message: "Payment successful!" });
    }
}

export default new AppController();
