const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true
    },
   
    patient: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient'
        }
    ,
    doctorName:{
        type: String,
    },
    //add doctor who created this report
    createdBy: 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor'
        }
    ,
   
},
    {
        timestamps: true // to know when report was created when was updated
    }

);

const Report = mongoose.model('Report', ReportSchema);
module.exports = Report;