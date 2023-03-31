const express = require("express");
const Doctor = require("../models/Doctor");
const router = express.Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register
router.post("/register", async (req, res) => {
  console.log("in register");
  const newDoctor = new Doctor({
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    name: req.body.name,
  });

  try {
    const savedDoctor = await newDoctor.save();
    console.log("here in try", savedDoctor);
    res.status(201).json(savedDoctor);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
});

//Login

//LOGIN

router.post('/login', async (req, res) => {
  try{
    console.log('herer1',req.body);
      const doctor = await Doctor.findOne(
          {
              email: req.body.email
          }
      );
      console.log('herer 2',doctor);
          if(!doctor){
             return res.status(401).json("Wrong Doctor Name");
          }
      console.log('herer 3');

      const hashedPassword = CryptoJS.AES.decrypt(
          doctor.password,
          process.env.PASS_SEC
      );
      console.log('herer 4');



      const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      const inputPassword = req.body.password;
      // console.log('herer 5');
      
      if(originalPassword != inputPassword){
          res.status(401).json("Wrong Password");
          return;
      }

      const accessToken = jwt.sign(
      {
          id: doctor._id,
          isAdmin: doctor.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );

      const { password, ...others } = doctor._doc;  
      return res.status(200).json({...others, accessToken});

  }catch(err){
    return res.status(500).json(err);
  }

});

module.exports = router;
