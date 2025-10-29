const cron = require('node-cron')
const medicineModel = require('../models/medicine.model')
const medicineLogService = require('../services/medicineLog.service')

function scheduleDailyMedicineLogs() {
    cron.schedule('*/1 * * * *', async () => {
        console.log("Creating today's logs");

        const today = new Date();
        today.setHours(0 ,0 ,0 ,0 ); // need to know why did this

        const activeMedicines = await medicineModel.find({
            startDate : {$lt : today},
            endDate : {$gte : today}
        })

        console.log(today.toString())

        for (const medicine of activeMedicines) {
            const createdLog = await medicineLogService.createDailyMedicineLogs({medicine, date : today})
            // console.log(createdLog)
        }
    }, {
        timezone : 'Asia/Kolkata'
    })
} 

module.exports = {
    scheduleDailyMedicineLogs
}