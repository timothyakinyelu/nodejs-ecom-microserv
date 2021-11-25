import shortid from 'shortid';
import debug from 'debug';
import { CreateCustomerDto } from "./dto";
import mongooseService from './db';

const log: debug.IDebugger = debug('app:mongoose-dao');

/** Data Access Object to handle connecting to the customer database
 * This class also performs the customer database queries
 */
class CustomersDao {
    // establish the mongodb model schema
    DBSchema = mongooseService.getMongoose().Schema;
    customerSchema = new this.DBSchema({
        _id: String,
        name: String,
    }, { id: false });
    
    Customer = mongooseService.getMongoose().model('Customers', this.customerSchema);

    constructor() {
        log('new Customer instance.');
    }
    
    /** insert new customer into database
     * @params CreateCustomerDto
     * @returns customer.id
     */
    async addCustomer(customerColumns: CreateCustomerDto): Promise<string>  {
        // customer.id = shortid.generate()
        // this.customers.push(customer);

        const customerId = shortid.generate();
        const customer = new this.Customer({
            _id: customerId,
            ...customerColumns,
            permissionFlags: 1,
        });
        await customer.save();
        return customerId;
        // return customer.id;
    }

    /** get all customers from database
     * @returns @Array customers
     */
    async getCustomers(limit=25, page=0): Promise<CreateCustomerDto[]> {
        return this.Customer.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
}

export default new CustomersDao;
