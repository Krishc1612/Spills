const express = require('express')
const medicineLogControllers = require('../controllers/medicineLog.controller')

const router = express.Router();

router.post('/createLogs/:medName', medicineLogControllers.createMedicineLogs)
// we are keeping /:medName here to actually gain info about the medicine for which we are going to make the logs for. Note that this would be required only once when the user makes a new medicine. As soon as the user makes the medicines frontend should call the above route to make the logs for it.

module.exports = router