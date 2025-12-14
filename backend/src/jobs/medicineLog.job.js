const cron = require('node-cron')
const medicineModel = require('../models/medicine.model')
const medicineLogService = require('../services/medicineLog.service')

function scheduleDailyMedicineLogs() {
    cron.schedule('0 0 * * *', async () => {
        console.log("Creating today's logs");

        const today = new Date();
        today.setHours(0 ,0 ,0 ,0 ); // need to know why did this

        const activeMedicines = await medicineModel.find({
            startDate : {$lt : today},
            endDate : {$gte : today}
        })

        // console.log(activeMedicines)
        // console.log(today.toString())

        try {
            for (const medicine of activeMedicines) {
                const createdLog = await medicineLogService.createDailyMedicineLogs({medicine, date : today})
                // console.log(createdLog)
            }
        } catch (error) {
            console.log("Failed to create logs for today.", error);
        }
    },{
        timezone : 'Asia/Kolkata'
    })
} 

function scheduleMarkingMissedLogs() {
    cron.schedule('0 0 * * *', async () => {
        try {
            await medicineLogService.markLogsAsMissed();
        } catch (error) {
            console.log("Failed to mark missed logs", error);
        } // crons shouldn't crash silently
    }, {
        timezone: 'Asia/Kolkata'
    })
}

module.exports = {
    scheduleDailyMedicineLogs,
    scheduleMarkingMissedLogs
}