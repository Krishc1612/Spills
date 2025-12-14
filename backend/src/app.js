const express = require('express')
const authRoutes = require('./routes/auth.routes')
const medicineRoutes = require('./routes/medicine.routes')
const medicineLogRoutes = require('./routes/medicineLog.routes')
const authMiddlewares = require('./middlewares/auth.middleware')
const medicineLogJob = require('./jobs/medicineLog.job')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

app.get('/', (req,res) => {
    res.send("This is sample server.")
})

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true
}))
app.use(cookieParser())
// app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use(
    '/api/medicine',
    authMiddlewares.authUserMiddleware,
    medicineRoutes
)
app.use(
    '/api/medicineLog',
    authMiddlewares.authUserMiddleware,
    medicineLogRoutes
)
// app.set("view engine", "ejs")

medicineLogJob.scheduleDailyMedicineLogs();
medicineLogJob.scheduleMarkingMissedLogs();

module.exports = app
// creating the app in app.js