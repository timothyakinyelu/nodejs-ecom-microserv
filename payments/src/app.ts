import express from 'express';
import cors from 'cors';
// import morgan from 'morgan';
// import helmet from 'helmet';
import debug from 'debug';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import RouteConfig from './routes/common.routes';
import ServiceRoutes from './routes/serviceRoutes';
import receiveMessageQueue from './utils/consumer';
import { serverSettings } from './config';


const routes: Array<RouteConfig> = [];
const debugLog: debug.IDebugger = debug('app');

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
app.use(express.json());
app.use(cors());
// app.use(morgan('dev'));
// app.use(helmet());

// initialize the logger with the above configuration
app.use(expressWinston.logger(loggerOptions));

const server: http.Server = http.createServer(app);
const runningMessage = `Server running at http://localhost:${serverSettings.port}`;

// pass all routes into the array
routes.push(new ServiceRoutes(app));
app.get('/', (req: express.Request, res: express.Response) => {
    res.status(200).send(runningMessage)
});

server.listen(serverSettings.port, () => {
    routes.forEach((route: RouteConfig) => {
        debugLog(`Routes configured for ${route.getName()}`);
    });
    receiveMessageQueue();
    debugLog(runningMessage);
});
