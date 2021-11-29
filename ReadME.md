### Ecommerce Test Task

    RUN docker-compose up --build

This command will build all the services along with the database and seeding.

#### Access the service through the gateway

Send all requests through the gateway service, this ensures that the service is prepped for future growth and scaling

    Customers Access GET and POST
    http://<ip-address>:3300/access-customers
    
    Products Access GET and POST
    http://<ip-address>:3300/access-products
    
    Orders Post and GET
    http://<ip-address>:3300/access-orders
    
    Payments GET
    http://<ip-address>:3300/access-payments
