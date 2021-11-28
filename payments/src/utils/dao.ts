import shortid from 'shortid';
import debug from 'debug';
import { CreateTransactionDto } from "./dto";
import mongooseService from './db';

const log: debug.IDebugger = debug('app:mongoose-dao');

/** Data Access Object to handle connecting to the transaction database
 * This class also performs the transaction database queries
 */
class TransactionsDao {
    // establish the mongodb model schema
    DBSchema = mongooseService.getMongoose().Schema;
    transactionSchema = new this.DBSchema({
        _id: String,
        customerId: String,
        productId: String,
        orderId: String,
        amount: String,
        orderStatus: String
    }, { id: false });
    
    Transaction = mongooseService.getMongoose().model('Transactions', this.transactionSchema);

    constructor() {
        log('new Transaction instance.');
    }
    
    /** insert new transaction into database
     * @params CreateTransactionDto
     * @returns transaction
     */
    async addTransaction(transactionColumns: CreateTransactionDto) {
        const transactionId = shortid.generate();
        const transaction = new this.Transaction({
            _id: transactionId,
            ...transactionColumns,
            permissionFlags: 1,
        });
        await transaction.save();
        return transaction;
    }

    /** get all transactions from database
     * @returns @Array transactions
     */
    async getTransactions(limit=25, page=0): Promise<CreateTransactionDto[]> {
        return this.Transaction.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
}

export default new TransactionsDao;
