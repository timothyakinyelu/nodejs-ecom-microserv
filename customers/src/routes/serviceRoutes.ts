import express from 'express';
import RouteConfig from "./common.routes";

class ServiceRoutes extends RouteConfig {
    constructor(app: express.Application) {
        super(app, 'ServiceRoutes');
    }

    /** Set all route configurations for the microservice */
    configureRoutes() {
        // set routes for the customer service
        this.app.route('/customers')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Fetch customers');
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send('Post to customers service')
            });
        return this.app;
    }
}

export default ServiceRoutes;
