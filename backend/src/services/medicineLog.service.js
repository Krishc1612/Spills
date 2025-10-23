// Why define services folder here? Isn't services for third party only? No, services folder holds the code that is common to some features. Here the function createDailyMedicineLogs would be common to both medicineLog controller as well as the automatic creation of Logs at definite times.

const medicineModel = require('../models/medicine.model')
const medicineLogModel = require('../models/medicineLog.model')

async function createDailyMedicineLogs({medicine} = {}){
    if (medicine) {
        const startDate = medicine.startDate;

        const medicineLogs = medicineLogModel.find({
            user : medicine.user,
            medicine,
            date : startDate // add some checks here 
        })

        if (!medicineLogs.length) {
            const logs = Array[String];
            medicine.times.forEach(async (time) => {
                logs[logs.length] = await medicineLogModel.create({
                    user : medicine.user,
                    medicine : medicine,
                    scheduledAt : time,
                    date : startDate
                })
            });
        }

        return logs;
    }
    else {
        
    }
}

module.exports = {
    createDailyMedicineLogs
}