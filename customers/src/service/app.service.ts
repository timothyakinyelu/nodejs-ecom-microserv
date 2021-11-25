import { CRUD } from "../utils/crud";
import CustomersDao from "../utils/dao";
import { CreateCustomerDto } from "../utils/dto";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Customers Data Acccess Object instead of calling the database directly
 * @returns new AppService()
 */
class AppService implements CRUD {
    /** Get All customers from the database
     * @returns customers
     */
    async getAll(limit: number, page: number) {
        return CustomersDao.getCustomers()
    };

    /** Add a new Customer
     * @returns customer.id
     */
    async create(resource: CreateCustomerDto) {
        return CustomersDao.addCustomer(resource);
    };
}

export default new AppService;
