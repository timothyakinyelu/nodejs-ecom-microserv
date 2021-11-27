import express from 'express';
import debug from 'debug';
import appService from '../service/app.service';

const log: debug.IDebugger = debug('app:app-controller');
/** Abstracts the processing of requests from the route configuration
 * @returns new AppController()
  */
class AppController {
    /** Handle requests to get all orders
     * @returns orders, status 200
     */
    async fetchOrders(req: express.Request, res: express.Response) {
        const orders = await appService.getAll(20, 0);
        res.status(200).send(orders);
    };

    /** add new a order to the database
     * @returns orderId, status 201
     */
    async addOrder(req: express.Request, res: express.Response) {
        const orderId = await appService.create(req.body);
        res.status(201).send({ id: orderId });
    }
}

export default new AppController();
