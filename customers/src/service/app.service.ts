import { CRUD } from "../utils/crud";
import CustomersDao from "../utils/dao";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Customers Data Acccess Object instead of calling the database directly
 */
class AppService implements CRUD {
    async getAll(limit: number, page: number) {
        return CustomersDao.getCustomers()
    };

    async create(resource: any) {
        return CustomersDao.addCustomer(resource)
    };
}

export default new AppService;
