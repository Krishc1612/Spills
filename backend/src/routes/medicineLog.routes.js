const express = require('express')
const authMiddleware = require('../middlewares/auth.middleware');
const medicineLogControllers = require('../controllers/medicineLog.controller')

const router = express.Router();

router.patch("/markTaken/:logId", authMiddleware.authUserMiddleware, medicineLogControllers.markAsTaken);
router.get("/todayLogs", authMiddleware.authUserMiddleware, medicineLogControllers.getTodayLogs);

module.exports = router