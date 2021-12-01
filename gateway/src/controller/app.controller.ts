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
        const { status, data } = await axios.post('http://customer-api/customers', req.body);
        res.status(status).send({ id: data });
    }

    async getFromCustomers(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://customer-api/customers');
        res.status(status).send(data);
    }

    async sendToOrders(req: express.Request, res: express.Response) {
        const { status, data } = await axios.post('http://order-api/orders', req.body);
        res.status(status).send({ order: data });
    }

    async getFromOrders(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://order-api/orders');
        res.status(status).send(data);
    }

    async sendToProducts(req: express.Request, res: express.Response) {
        const { status, data } = await axios.post('http://product-api/products', req.body);
        res.status(status).send({ product: data });
    }

    async getFromProducts(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://product-api/products');
        res.status(status).json(data)
    }

    async getFromPayments(req: express.Request, res: express.Response) {
        const { status, data } = await axios.get('http://payment-api/transactions');
        res.status(status).send(data);
    }

}

export default new AppController();
