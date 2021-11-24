import express from 'express';

export default abstract class RouteConfig {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes()
    }

    getName() {
        return this.name;
    }

    /** this enables the addition of route methods and path to any class that extends the RouteConfig */
    abstract configureRoutes(): express.Application;
}
