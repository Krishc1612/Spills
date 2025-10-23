const express = require('express')
const medicineControllers = require('../controllers/medicine.controller')

const router = express.Router()

router.post('/create', medicineControllers.createMedicine)
router.get('/:medName', medicineControllers.readMedicine)
router.patch('/update', medicineControllers.updateMedicine)
router.delete('/:medName', medicineControllers.deleteMedicine)

module.exports = router