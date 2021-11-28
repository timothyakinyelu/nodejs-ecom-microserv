import express from 'express';
import debug from 'debug';
import appService from '../service/app.service';
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
        // res.status(201).send({ id: transactionId });
    }

    async receiveTransaction(req: express.Request, res: express.Response) {
        // parse the request body and send to a rabbitmq queue
    }
}

export default new AppController();
