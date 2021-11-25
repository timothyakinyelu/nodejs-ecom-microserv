import mongoose from 'mongoose';
import debug from 'debug';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;

    constructor() {
        this.connectWithRetry();
    }

    /** get the mongodb database 
     * @returns mongoose
     */
    getMongoose() {
        return mongoose;
    }

    /** establishes a connection with mongodb
     * and retries every 5 seconds if the connection fails
     */
    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');
        mongoose
            .connect('mongodb://localhost:27017/servicedb')
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
};

export default new MongooseService();
