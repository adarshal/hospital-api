const mongoose = require('mongoose');

// const multer = require('multer');
// const path = require('path');
// const AVATAR_PATH = path.join('/uploads/users/avatars');

const DoctorSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
            },
     name:{
        type:String,
        required: true
    },
    isAdmin:{
        type: Boolean,
         default:true,
    },
    img:{
      type:String,
  },
    
    
  },{
    timestamps: true // to know when user was created when was updated
  });
;

  const Doctor=mongoose.model('Doctor',DoctorSchema);
//This is coolection, collection contain docs,docs contains fields like name,date. collectn name start capital
module.exports =Doctor;