const mongoose = require('mongoose')

const medicineLogSchema = mongoose.Schema({
    medicine : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "medicine",
        required : true
    },
    user : {
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
        enum : ['taken', 'missed', 'canceled'],
        default : null
    }
})

const medicineLogModel = mongoose.model("medicineLog", medicineLogSchema);

module.exports = medicineLogModel