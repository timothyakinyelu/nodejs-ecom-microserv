import { CRUD } from "../utils/crud";
import CustomersDao from "../utils/dao";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Customers Data Acccess Object instead of calling the database directly
 * @return new AppService()
 */
class AppService implements CRUD {
    /** Get All customers from the database
     * @return customers
     */
    async getAll(limit: number, page: number) {
        return CustomersDao.getCustomers()
    };

    /** Add a new Customer
     * @return customer.id
     */
    async create(resource: any) {
        return CustomersDao.addCustomer(resource)
    };
}

export default new AppService;
