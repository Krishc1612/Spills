const express = require('express')
const medicineControllers = require('../controllers/medicine.controller')

const router = express.Router()

router.post('/create', medicineControllers.createMedicine)

router.get('/:id', medicineControllers.readMedicine)

module.exports = router