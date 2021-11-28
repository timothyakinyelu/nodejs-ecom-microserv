import { CRUD } from "../utils/crud";
import TransactionsDao from "../utils/dao";
import { CreateTransactionDto } from "../utils/dto";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Transactions Data Acccess Object instead of calling the database directly
 * @returns new AppService()
 */
class AppService implements CRUD {
    /** Get All transactions from the database
     * @returns transactions
     */
    async getAll(limit: number, page: number) {
        return TransactionsDao.getTransactions(limit, page)
    };

    /** Add a new transaction
     * @returns transaction
     */
    async create(resource: CreateTransactionDto) {
        return TransactionsDao.addTransaction(resource);
    };
}

export default new AppService;
