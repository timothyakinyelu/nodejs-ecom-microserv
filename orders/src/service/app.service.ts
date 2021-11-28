import { CRUD } from "../utils/crud";
import OrdersDao from "../utils/dao";
import { CreateOrderDto } from "../utils/dto";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Orders Data Acccess Object instead of calling the database directly
 * @returns new AppService()
 */
class AppService implements CRUD {
    /** Get All orders from the database
     * @returns orders
     */
    async getAll(limit: number, page: number) {
        return OrdersDao.getOrders(limit, page)
    };

    /** Add a new Order
     * @returns order
     */
    async create(resource: CreateOrderDto) {
        return OrdersDao.addOrder(resource);
    };
}

export default new AppService;
