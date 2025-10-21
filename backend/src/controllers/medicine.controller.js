const medicineModel = require('../models/medicine.model')

async function createMedicine(req, res) {
    try {
        const user = req.user;
        const { medName } = req.body;
        
        if (!medName || !user) {
            return res.status(400).json({ message: "medName and userId are required." });
        }
        // take care of this too afterwards that it may happen that user don't enter anything at all. Although we will check it in frontend only this is the double check for it. Infact triple check as we check it in the database Schema too.

        const medicineExists = await medicineModel.findOne({ medName, user });
        if (medicineExists) {
            return res.status(409).json({
                message: "Medicine already exists.",
                medicine: medicineExists._id
            });
        }

        const medicine = await medicineModel.create({ ...req.body, user, medName });
        // same as the things we wrote earlier just in somewhat shorter form. Note that here the req.body's userId will not get assigned to medicine but the explicitly mentioned userId after ...req.body. This is the standard syntax for it.

        return res.status(201).json({
            message: "Medicine created successfully!",
            medicine: {
                _id: medicine._id,
                medName: medicine.medName,
                frequency: medicine.frequency,
                dosage: medicine.dosage,
                instructions: medicine.instructions,
                startDate: medicine.startDate,
                endDate: medicine.endDate
            }
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to create the medicine." });
    }
}

// Note that it is better to validate all the data in the frontend too because anyone can override the frontend using postman or similar service. So always do the checks twice excluding the database checks.

async function updateMedicine(req, res){

}

async function readMedicine(req, res){

}

async function deleteMedicine(req, res){

}

module.exports = {
    createMedicine,
    updateMedicine,
    readMedicine,
    deleteMedicine
}