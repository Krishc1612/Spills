const mongoose = require('mongoose')

const medicineLogSchema = mongoose.Schema({
    medicineId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "medicine",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    scheduledAt : {
        type : String,
        required : true
    },
    takenAt : {
        type : String,
        default : null
    },
    status : {
        type : String,
        enum : ['taken', 'missed', 'canceled', "pending"],
        default : "pending"
    }
    // reminderSent : {
    //     type : Boolean,
    //     default : false
    // }
})

const medicineLogModel = mongoose.model("medicineLog", medicineLogSchema);

module.exports = medicineLogModel