const express = require('express')
const authRoutes = require('../routes/auth.routes')
const cookieParser = require('cookie-parser')

const app = express()

app.get('/', (req,res) => {
    res.send("This is sample server.")
})

app.use(cookieParser())
// app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.set("view engine", "ejs")

module.exports = app
// creating the app in app.js