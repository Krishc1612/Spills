const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    DOB : {
        type : Date,
        required : true
    },
    password : {
        type : String,
        required : true,
    }
}, 
{
    timestamps : true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel