const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");
const Report = require("../models/Report");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  findDoctor
} = require("./verifyToken");

// get all reports of user
router.get("/:status", verifyTokenAndAdmin, async (req, res) => {
    console.log('in repoerts',req.params.status)
    try {
        const searchWord=req.params.status;
       
        const reports = await Report.find({
            $or: [
              
              { status: { $regex: searchWord, $options: "i" } },
              
            ],
          });
      
          return res.status(200).json(reports);
        } catch (error) {
          return res.status(500).json("There was an error in showing reports.");
        }
      });


module.exports = router;
