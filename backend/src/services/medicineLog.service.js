// Why define services folder here? Isn't services for third party only? No, services folder holds the code that is common to some features. Here the function createDailyMedicineLogs would be common to both medicineLog controller as well as the automatic creation of Logs at definite times (medicineLog.job).

const medicineModel = require('../models/medicine.model');
const medicineLogModel = require('../models/medicineLog.model');
const userModel = require('../models/user.model');
const emailServices = require('./email.service')

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

async function findAndSendReminders() {
    const today = new Date();
    const todayStart = new Date(today);
    todayStart.setHours(0,0,0,0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    const time = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const minute = parseInt(time.slice(3,5));

    // if (minute % 5 != 0){
    //     throw new Error("Minutes must be multiple of 5."); 
    //     // we only take schedule times that are multiple of 5.
    //     // In the frontend too we would set it up like that.
    //     // Also we have to change the check the input while creating meds.
    // } why comment this too? We already have enforced it through the job. No need here.

    const toBeRemindedLogs = await medicineLogModel.find({
        date : {$gte : todayStart, $lte : todayEnd},
        scheduledAt : time,
        status : "pending",
        reminderSent : false
    });

    if (toBeRemindedLogs.length == 0){
        console.log("No logs to remind.");
        return;
    }

    for (const log of toBeRemindedLogs) {
        const user = await userModel.findById(log.userId);
        const med = await medicineModel.findById(log.medicineId);

        try {
            await emailServices.sendEmail(user.fullName, user.email, med.medName);

            await medicineLogModel.updateOne(
                { _id : log._id },
                { $set : { reminderSent : true } }
            );
            
        } catch (error) {
            // throw new Error(error.message); Don't do this this will crash the whole batch i.e, if one reminder crashes all of them would crash.
            console.error(`Reminder failed for log ${log._id}: `, error.message);
            continue;
        }
    }
}

module.exports = {
    createDailyMedicineLogs,
    markLogsAsMissed,
    findAndSendReminders
}