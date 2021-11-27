/** Data Transfer Object that serves as a model for data to be transferred and received
 * from the order database
 */
export interface CreateOrderDto {
    customerId: string;
    productId: string;
    amount: string;
    status: string;
}
