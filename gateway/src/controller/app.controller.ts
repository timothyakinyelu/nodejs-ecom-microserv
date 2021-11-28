import express from 'express';
import debug from 'debug';
import axios from 'axios';

const log: debug.IDebugger = debug('app:app-controller');
/** Abstracts the processing of requests from the route configuration
 * forward request to the designated service
 * @returns new AppController()
  */
class AppController {
    async sendToCustomers(req: express.Request, res: express.Response) {
        const { status, data } = await axios.post('http://localhost:3301/customers', req.body);
        res.status(status).send({ id: data });
    }

    async getFromCustomers(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://localhost:3301/customers');
        res.status(status).send(data);
    }

    async sendToOrders(req: express.Request, res: express.Response) {
        const { status, data } = await axios.post('http://localhost:3303/orders', req.body);
        res.status(status).send({ order: data });
    }

    async getFromOrders(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://localhost:3303/orders');
        res.status(status).send(data);
    }

    async sendToProducts(req: express.Request, res: express.Response) {
        const { status, data } = await axios.post('http://localhost:3302/products', req.body);
        res.status(status).send({ product: data });
    }

    async getFromProducts(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://localhost:3302/products');
        res.status(status).json(data)
    }

    async getFromPayments(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://localhost:3304/transactions');
        res.status(status).send(data);
    }

}

export default new AppController();
