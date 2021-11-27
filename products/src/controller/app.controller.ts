import express from 'express';
import debug from 'debug';
import appService from '../service/app.service';

const log: debug.IDebugger = debug('app:app-controller');
/** Abstracts the processing of requests from the route configuration
 * @returns new AppController()
  */
class AppController {
    /** Handle requests to get all products
     * @returns products, status 200
     */
    async fetchProducts(req: express.Request, res: express.Response) {
        const products = await appService.getAll(20, 0);
        res.status(200).send(products);
    };

    /** add new a product to the database
     * @returns productId, status 201
     */
    async addProduct(req: express.Request, res: express.Response) {
        const productId = await appService.create(req.body);
        res.status(201).send({ id: productId });
    }
}

export default new AppController();
