import express from 'express';
import debug from 'debug';
import appService from '../service/app.service';

const log: debug.IDebugger = debug('app:app-controller');
/** Abstracts the processing of requests from the route configuration
 * @returns new AppController()
  */
class AppController {
    /** Handle requests to get all customers
     * @returns customers, status 200
     */
    async fetchCustomers(req: express.Request, res: express.Response) {
        const customers = await appService.getAll(20, 0);
        res.status(200).send(customers);
    };

    /** add new a customer to the database
     * @returns customerId, status 201
     */
    async addCustomer(req: express.Request, res: express.Response) {
        const customerId = await appService.create(req.body);
        res.status(201).send({ id: customerId });
    }
}

export default new AppController();
