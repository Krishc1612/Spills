const mongoose = require("mongoose")

const medicineSchema = mongoose.Schema({
    medName : {
        type : String,
        required : true
    },
    dosage : {
        type : String,
        required : true
    },
    frequency : {
        type : Number,
        required : true
    },
    instructions : {
        type : String
    },
    startDate : {
        type : Date,
        required : true
    },
    endDate : {
        type : Date,
        required : true
    },
    times : {
        type : [Date],
        required : true
    },
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
        required : true
    }
}, 
{
    timestamps : true
});

const medicineModel = mongoose.model("medicine", medicineSchema)

module.exports = medicineModel