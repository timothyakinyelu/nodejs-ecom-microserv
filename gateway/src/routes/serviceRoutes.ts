import express from 'express';
import RouteConfig from "./common.routes";

class ServiceRoutes extends RouteConfig {
    constructor(app: express.Application) {
        super(app, 'ServiceRoutes');
    }

    /** Set all route configurations for the microservice */
    configureRoutes() {
        // set routes for the customer service
        this.app.route('/access-customers')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Fetch customers');
            })
            .post((req: express.Request, res: express.Response) => {
                res.status(200).send('Post to customers service')
            });
        
        // set routes for products service
        this.app.route('/access-products')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Fetch products');
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send("Post to products service")
            })
    
        // set routes for products service
        this.app.route('/access-orders')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Fetch products');
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send("Post to orders service")
            })
    
        // set routes for products service
        this.app.route('/access-payments')
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send('Fetch products');
            })
            .get((req: express.Request, res: express.Response) => {
                res.status(200).send("Post to payments service")
            })
        return this.app;
    }
}

export default ServiceRoutes;
