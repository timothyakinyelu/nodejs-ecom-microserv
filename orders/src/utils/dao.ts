import shortid from 'shortid';
import debug from 'debug';
import { CreateOrderDto } from "./dto";
import mongooseService from './db';

const log: debug.IDebugger = debug('app:mongoose-dao');

/** Data Access Object to handle connecting to the order database
 * This class also performs the order database queries
 */
class OrdersDao {
    // establish the mongodb model schema
    DBSchema = mongooseService.getMongoose().Schema;
    orderSchema = new this.DBSchema({
        _id: String,
        customerId: String,
        productId: String,
        amount: String,
        status: String
    }, { id: false });
    
    Order = mongooseService.getMongoose().model('Orders', this.orderSchema);

    constructor() {
        log('new Order instance.');
    }
    
    /** insert new order into database
     * @params CreateOrderDto
     * @returns order
     */
    async addOrder(orderColumns: CreateOrderDto) {
        const orderId = shortid.generate();
        const order = new this.Order({
            _id: orderId,
            ...orderColumns,
            permissionFlags: 1,
        });
        await order.save();
        // send order data to payment service from here
        return order;
    }

    /** get all orders from database
     * @returns @Array orders
     */
    async getOrders(limit=25, page=0): Promise<CreateOrderDto[]> {
        return this.Order.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
}

export default new OrdersDao;
