import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import debug from 'debug';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import RouteConfig from './routes/common.routes';
import ServiceRoutes from './routes/serviceRoutes';

type IStart = {
    port: string | number;
}

/** start the service */
const start = (options: IStart) => {
    const routes: Array<RouteConfig> = [];
    const debugLog: debug.IDebugger = debug('app');

    return new Promise((resolve, reject) => {
        // ensure port is added before service starts
        if (!options.port) {
            reject(new Error('The server must be started with an available port'))
        }

        const loggerOptions: expressWinston.LoggerOptions = {
            transports: [new winston.transports.Console()],
            format: winston.format.combine(
                winston.format.json(),
                winston.format.prettyPrint(),
                winston.format.colorize({ all: true })
            ),
        };
        
        if (!process.env.DEBUG) {
            loggerOptions.meta = false; // when not debugging, log requests as one-liners
        }

        const app: express.Application = express();
        app.use(cors());
        app.use(morgan('dev'));
        app.use(helmet());

        // initialize the logger with the above configuration
        app.use(expressWinston.logger(loggerOptions));

        const server: http.Server = http.createServer(app);
        const runningMessage = `Server running at http://localhost:${options.port}`;

        // pass all routes into the array
        routes.push(new ServiceRoutes(app));
        app.get('/', (req: express.Request, res: express.Response) => {
            res.status(200).send(runningMessage)
        });

        server.listen(options.port, () => {
            routes.forEach((route: RouteConfig) => {
                debugLog(`Routes configured for ${route.getName()}`);
            });
            resolve(server);
            console.log(runningMessage);
        });
    });
}

export default start;
