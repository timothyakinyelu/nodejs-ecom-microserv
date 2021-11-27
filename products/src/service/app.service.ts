import { CRUD } from "../utils/crud";
import ProductsDao from "../utils/dao";
import { CreateProductDto } from "../utils/dto";

/** Service to handle database communication
 * This pattern allows for separation of concern and lets the service focus on 
 * calling the Products Data Acccess Object instead of calling the database directly
 * @returns new AppService()
 */
class AppService implements CRUD {
    /** Get All products from the database
     * @returns products
     */
    async getAll(limit: number, page: number) {
        return ProductsDao.getProducts(limit, page)
    };

    /** Add a new Product
     * @returns product.id
     */
    async create(resource: CreateProductDto) {
        return ProductsDao.addProduct(resource);
    };
}

export default new AppService;
