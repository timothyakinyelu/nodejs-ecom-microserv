import { CRUD } from "../utils/crud";
import CustomersDao from "../utils/dao";

class AppService implements CRUD {
    async getAll(limit: number, page: number) {
        return CustomersDao.getCustomers()
    };

    async create(resource: any) {
        return CustomersDao.addCustomer(resource)
    };
}

export default new AppService;
