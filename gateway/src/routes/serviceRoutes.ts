import express from 'express';
import appController from '../controller/app.controller';
import RouteConfig from "./common.routes";

class ServiceRoutes extends RouteConfig {
    constructor(app: express.Application) {
        super(app, 'ServiceRoutes');
    }

    /** Set all route configurations for the microservice */
    configureRoutes() {
        // set routes for the customers service
        this.app.route('/access-customers')
            .get(appController.getFromCustomers)
            .post(appController.sendToCustomers);
        
        // set routes for products service
        this.app.route('/access-products')
            .get(appController.getFromProducts)
            .post(appController.sendToProducts)
    
        // set routes for orders service
        this.app.route('/access-orders')
            .get(appController.getFromOrders)
            .post(appController.sendToOrders)
    
        // set routes for payments service
        this.app.route('/access-payments')
            .get(appController.getFromPayments)
        return this.app;
    }
}

export default ServiceRoutes;
