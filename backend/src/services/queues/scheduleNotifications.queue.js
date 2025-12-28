const notificationQueue = require('./notifications.queue');

async function scheduleNotifications(payload, delayMs) {
    await notificationQueue.add(
        'send-Notification',
        payload,
        {
            delay : delayMs,
            attempts : 3,
            backoff : {
                type : 'exponential',
                delay : 5000
            },
            removeOnComplete : true
        }
    )
}

module.exports = scheduleNotifications;