const { Queue } = require('bullmq');
const connection = require('./connection.queue');

const notificationQueue = new Queue(
    'notification-queue',
    { connection }
);

module.exports = notificationQueue;