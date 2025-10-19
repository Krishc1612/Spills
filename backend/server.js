require('dotenv').config();

const app = require('./src/app')
const connectDB = require('./db/db')

connectDB();

app.listen(process.env.PORT, () => {
    console.log("Server started on PORT.")
}) // starting the app in server.js