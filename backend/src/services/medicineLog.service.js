// Why define services folder here? Isn't services for third party only? No, services folder holds the code that is common to some features. Here the function createDailyMedicineLogs would be common to both medicineLog controller as well as the automatic creation of Logs at definite times.

const medicineModel = require('../models/medicine.model')
const medicineLogModel = require('../models/medicineLog.model')

async function createDailyMedicineLogs({ medicine } = {}){
    // returns array of created logs (or existing logs for that date)

    if (!medicine) {
        // node-cron function call
    }

    const startDate = medicine.startDate

    // find existing logs for this user/medicine/date
    const medicineLogs = await medicineLogModel.find({
        user: medicine.user,
        medicine: medicine._id,
        date: startDate
    })

    // if logs already exist for that date, return them
    if (medicineLogs && medicineLogs.length > 0) {
        return medicineLogs
    }

    // create logs for each scheduled time
    const logs = []
    for (const time of (medicine.times || [])) {
        // scheduledAt is stored as string in the schema — keep as-is, but you may want
        // to combine date+time into a Date if needed.
        const created = await medicineLogModel.create({
            user: medicine.user,
            medicine: medicine._id,
            scheduledAt: time,
            date: startDate
        })

        console.log(created)

        logs.push(created)
    }

    return logs
}

module.exports = {
    createDailyMedicineLogs
}