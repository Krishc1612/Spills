const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true
    },
    medicineId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'medicine',
        required : true
    },
    scheduledAt : {
        type : Date,
        required : true
    },
    payload : {
        fullName : {
            type : String,
            required : true
        },
        medName : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true
        },
        time : {
            type : String,
            required : true
        },
        dosage : {
            type : String,
            required : true
        }
    }
})