import shortid from 'shortid';
import debug from 'debug';
import { CreateProductDto } from "./dto";
import mongooseService from './db';

const log: debug.IDebugger = debug('app:mongoose-dao');

/** Data Access Object to handle connecting to the product database
 * This class also performs the product database queries
 */
class ProductsDao {
    // establish the mongodb model schema
    DBSchema = mongooseService.getMongoose().Schema;
    productSchema = new this.DBSchema({
        _id: String,
        name: String,
        price: String,
    }, { id: false });
    
    Product = mongooseService.getMongoose().model('Products', this.productSchema);

    constructor() {
        log('new Product instance.');
    }
    
    /** insert new product into database
     * @params CreateProductDto
     * @returns product.id
     */
    async addProduct(productColumns: CreateProductDto): Promise<string>  {
        const productId = shortid.generate();
        const product = new this.Product({
            _id: productId,
            ...productColumns,
            permissionFlags: 1,
        });
        await product.save();
        return productId;
    }

    /** get all products from database
     * @returns @Array products
     */
    async getProducts(limit=25, page=0): Promise<CreateProductDto[]> {
        return this.Product.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
}

export default new ProductsDao;
