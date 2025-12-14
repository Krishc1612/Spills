const medicineModel = require('../models/medicine.model')
const medicineLogServices = require('../services/medicineLog.service')

async function createMedicine(req, res) {
    try {
        const userId = req.userId;
        const { medName } = req.body;

        if (!medName || !userId) {
            return res.status(400).json({ message: "medName and userId are required." });
        }
        // take care of this too afterwards that it may happen that user don't enter anything at all. Although we will check it in frontend only this is the double check for it. Infact triple check as we check it in the database Schema too.

        const medicineExists = await medicineModel.findOne({ medName, userId });
        if (medicineExists) {
            return res.status(409).json({
                message: "Medicine already exists.",
                medicine: medicineExists._id
            });
        }

        const medicine = await medicineModel.create({ ...req.body, userId, medName });
        // same as the things we wrote earlier just in somewhat shorter form. Note that here the req.body's userId will not get assigned to medicine but the explicitly mentioned userId after ...req.body. This is the standard syntax for it.
        // console.log(medicine.userId);
        // console.log(medicine);
        
        const date = medicine.startDate;
        const logs = await medicineLogServices.createDailyMedicineLogs({
            medicine,
            date
        });

        return res.status(201).json({
            message: "Medicine created successfully!",
            medicine: {
                _id: medicine._id,
                medName: medicine.medName,
                frequency: medicine.frequency,
                dosage: medicine.dosage,
                instructions: medicine.instructions,
                times : medicine.times,
                startDate: medicine.startDate,
                endDate: medicine.endDate
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
}

// Note that it is better to validate all the data in the backend too because anyone can override the frontend using postman or similar service. So always do the checks twice excluding the database checks.

async function updateMedicine(req, res){
    const userId = req.userId;
    const { medName, updates } = req.body;

    if (!updates){
        return res.status(400).json({
            message : "No updates provided."
        });
    }

    const updatedMedicine = await medicineModel.findOneAndUpdate(
        { medName, userId },
        { $set: updates },
        { new: true, runValidators: true }
    );
    // what the above lines do is find the medicine and then change only the fields mentioned in the updates to do this we do used $set. And now as we have changed them we would see whether the new entries get validated by the requirements of the schema.
    // To do that we did runValidators : true and as the update method by default returns the old medicine what we did was simply set new : true to return the updated one.

    // Also note the structure or syntax of the update,
    // findOneAndUpdate(filterObj, updateObj, optionsObj, callback), we didn't needed a callback or a function here when we updated a med.

    // await medicine.save(); This is only needed when we explicitly find a medicine and change it's fields manually. Like medicine.medName = "Something" this is manual change.
    return res.status(200).json({
        message : "Updated Medicine Details.",
        medicine : {
            _id: updatedMedicine._id,
            medName: updatedMedicine.medName,
            frequency: updatedMedicine.frequency,
            dosage: updatedMedicine.dosage,
            instructions: updatedMedicine.instructions,
            startDate: updatedMedicine.startDate,
            endDate: updatedMedicine.endDate
        }
    })
}

async function readMedicine(req, res){
    try {
        const { medName } = req.params;
        const userId = req.userId;

        const medicine = await medicineModel.findOne({ medName, userId });

        if (!medicine){
            return res.status(404).json({
                message : "Medicine not found."
            })
        }

        return res.status(200).json({
            message : "Medicine found!",
            medicine : {
                _id: medicine._id,
                medName: medicine.medName,
                frequency: medicine.frequency,
                dosage: medicine.dosage,
                instructions: medicine.instructions,
                startDate: medicine.startDate,
                endDate: medicine.endDate                
            }
        })
    } catch (err) {
        return res.status(500).json({
            message : "Failed to find the medicine.",
            error: err.message
        })
    }
}

async function deleteMedicine(req, res){
    try {
        const userId = req.userId;
        const { medName } = req.params;
        
        const medicine = await medicineModel.findOne({ medName, userId })

        if (!medicine) {
            return res.status(400).json({
                message : "Medicine not found."
            })
        }

        await medicine.deleteOne();

        return res.status(200).json({
            message : "Medicine deleted."
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message : "Failed to delete the medicine."
        })
    } 
}

module.exports = {
    createMedicine,
    updateMedicine,
    readMedicine,
    deleteMedicine
}