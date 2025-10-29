const medicineLogModel = require('../models/medicineLog.model')
const medicineModel = require('../models/medicine.model')
const medicineLogServices = require('../services/medicineLog.service')

async function createMedicineLogs(req, res){
    const { medName } = req.params;
    const user = req.user;

    if (!user){
        return res.status(400).json({
            message : "Please Login/Register first."
        })
    }
    else if (!medName) {
        return res.status(400).json({
            message : "Medicine not found."
        })
    }

    const medicine = await medicineModel.findOne({ user, medName })

    if (!medicine) {
        return res.status(400).json({
            message : "Medicine not found.",
            medName : medName
        })
    }

    const logs = await medicineLogServices.createDailyMedicineLogs({medicine, date : medicine.startDate})

    return res.status(201).json({
        message : `Created logs for date: ${medicine.startDate}`,
        medicineLog : logs
    })
}

module.exports = {
    createMedicineLogs
}