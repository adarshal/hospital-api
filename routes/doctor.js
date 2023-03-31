const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

console.log("Router loaded");


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
    //console.log("here in try", savedDoctor);
    const{password, ...others}=await Doctor.findOne({ _id: savedDoctor._id }).select('-password');;
    res.status(201).json(others._doc);
    return;
  } catch (err) {
    console.log(err.index)
    if(err.index>=0){
      console.log('jjjj')
      return res.status(500).json("err doctor alredy present")
      return;
    }
    res.status(500).json(err);
    return;
  }
});

//Login

//LOGIN

router.post("/login", async (req, res) => {
  try {
    //console.log("herer1", req.body);
    const doctor = await Doctor.findOne({
      email: req.body.email,
    });
    
    if (!doctor) {
      return res.status(401).json("Wrong Doctor Name");
    }
    

    const hashedPassword = CryptoJS.AES.decrypt(
      doctor.password,
      process.env.PASS_SEC
    );
    
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;
   

    if (originalPassword != inputPassword) {
      res.status(401).json("Wrong Password");
      return;
    }

    const accessToken = jwt.sign(
      {
        id: doctor._id,
        isAdmin: doctor.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = doctor._doc;
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});





//GET USER
router.get("/find", verifyTokenAndAdmin, async (req, res) => {
 
  try {
    // const user = await User.findById(req.params.id);
    // const { password, ...others } = user._doc;
    return res.status(200).json("loged in");
  } catch (err) {
    return res.status(500).json(err);
  }
});





module.exports = router;
