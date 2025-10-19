const mongoose = require("mongoose")

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to the Database.")
    }) .catch((err) => {
        console.log("Can't connect to the Database.")
    }) 
}

module.exports = connectDB