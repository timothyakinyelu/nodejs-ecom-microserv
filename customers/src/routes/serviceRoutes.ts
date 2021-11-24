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

    /** Set all route configurations for the customer service */
    configureRoutes() {
        this.app.route('/customers')
            .get(appController.fetchCustomers)
            .post(appController.addCustomer);
        return this.app;
    }
}

export default ServiceRoutes;
