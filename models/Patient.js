const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        
    },
    // include the array of ids of all report in this user schema itself
    reports: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report'
        }
    ],
    
},
    {
        timestamps: true // to know when patient was created when was updated
    }

);

const Patient = mongoose.model('Patient', PatientSchema);
module.exports = Patient;