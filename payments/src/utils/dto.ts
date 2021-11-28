/** Data Transfer Object that serves as a model for data to be transferred and received
 * from the transaction database
 */
export interface CreateTransactionDto {
    customerId: string;
    productId: string;
    orderId: string;
    amount: string;
    orderStatus: string;
}
