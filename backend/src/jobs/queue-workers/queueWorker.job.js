const { Worker } = require('bullmq');
const connection = require('../../services/queues/connection.queue');

const notificationWorker = new Worker(
    'notification-queue',
    async job => {
        console.log('processing job: ', job.id, job.data);

    },
    { connection }
);

notificationWorker.on('completed', job =>{
    console.log(`Job ${job.id} completed.`);
});

notificationWorker.on('failed', (job, error) => {
    console.error(`Job ${job.id} failed: ${error}`);
});