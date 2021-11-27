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

    /** Set all route configurations for the order service */
    configureRoutes() {
        this.app.route('/orders')
            .get(appController.fetchOrders)
            .post(appController.addOrder);
        return this.app;
    }
}

export default ServiceRoutes;
