import express from 'express';
import appController from '../controller/app.controller';
import RouteConfig from "./common.routes";

/** simple route configuration that accepts request and forwards
 * to the appcontroller for processing
 */
class ServiceRoutes extends RouteConfig {
    constructor(app: express.Application) {
        super(app, 'ServiceRoutes');
    }

    /** Set all route configurations for the product service */
    configureRoutes() {
        this.app.route('/products')
            .get(appController.fetchProducts)
            .post(appController.addProduct);
        return this.app;
    }
}

export default ServiceRoutes;
