/** This is a rabbitMQ consumer that listens for
 * a queueName and pulls the payload to be saved
 * in the database
 */

import amqp from 'amqplib/callback_api';
import debug from 'debug';
import appController from '../controller/app.controller';

const log: debug.IDebugger = debug('app:rabbit-consumer');
const hostUrl = 'amqp://host.docker.internal:15672';
 
const receiveMessageQueue = () => {
    amqp.connect(hostUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'insertTransaction';

            channel.assertQueue(queue, {
                durable: false
            });

            channel.consume(queue, function (data: any) {
                const transaction = JSON.parse(data.content.toString())
                log(" [x] Received Transaction:", transaction);
                appController.addTransaction(transaction);
            }, {
                noAck: true
            });
        });
    });
};

export default receiveMessageQueue;
