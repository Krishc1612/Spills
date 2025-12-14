// Why define services folder here? Isn't services for third party only? No, services folder holds the code that is common to some features. Here the function createDailyMedicineLogs would be common to both medicineLog controller as well as the automatic creation of Logs at definite times (medicineLog.job).

const medicineLogModel = require('../models/medicineLog.model')

async function createDailyMedicineLogs({ medicine, date } = {}){
    // returns array of created logs (or existing logs for that date)

    if (!medicine || !date) {
        throw new Error("Medicine and date are required keys.");
        // return;
    }

    // console.log(medicine)

    // find existing logs for this user/medicine/date
    const medicineLogs = await medicineLogModel.find({
        userId: medicine.userId,
        medicineId: medicine._id,
        date: date
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

        // we did medicine.times || [] because there is a possibility that times can be non-iterable like undefined or null. Which can cause crashes.
        const created = await medicineLogModel.create({
            userId: medicine.userId,
            medicineId: medicine._id,
            scheduledAt: time,
            date: date
        })

        // console.log(created)
        logs.push(created)
    }

    return logs
}

async function markLogsAsMissed() {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // we are setting the time of this Date object as midnight

    const yesterdayStart = new Date(today);
    yesterdayStart.setDate(today.getDate() - 1);

    const yesterdayEnd = new Date(today);

    const result = await medicineLogModel.updateMany(
        {
            date: { $gte: yesterdayStart, $lt: yesterdayEnd }, // No matter what the time on yesterday if the status is pending the log would be marked missed.
            status: "pending"
        },
        { $set: { status: "missed" } }
    );

    return result; // stats only
}

module.exports = {
    createDailyMedicineLogs,
    markLogsAsMissed,
}