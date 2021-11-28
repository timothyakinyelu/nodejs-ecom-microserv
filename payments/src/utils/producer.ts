/** This is a rabbitMQ producer that is responsible for
 * setting up a queue and publishing messages to the 
 * rabbitMQ server
 */

import amqp from 'amqplib/callback_api';
import debug from 'debug';

const log: debug.IDebugger = debug('app:rabbit-producer');
const hostUrl = 'amqp://host.docker.internal:15672';

const sendRabbitMsg = (queueName: string, payload: string) => {
    amqp.connect(hostUrl, function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = queueName;

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(payload));

            log(" [x] Sent %s", payload);
        });
        setTimeout(function () {
            connection.close();
        }, 500);
    });
}

export default sendRabbitMsg;
