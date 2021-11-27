/** Data Transfer Object that serves as a model for data to be transferred and received
 * from the order database
 */
export interface CreateOrderDto {
    name: string;
    price: string;
}
