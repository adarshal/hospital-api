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



//register patient
router.post("/register", verifyTokenAndAdmin, async (req, res) => {
  try {
    console.log(req.body)
    const patient = await Patient.findOne({
      email: req.body.email,
    });
    // return the patient if already present
    if (patient) {
        console.log('patient found',patient);
        const id=patient._id;
        const jn={"text":"patient is already present",patient,}
      return res.status(200).json(jn);
    }
    console.log("in register patient");
    const newPatient = new Patient({
      email: req.body.email,
      
      name: req.body.name,
    });

    const savedPatient = await newPatient.save();
    console.log("here in try", savedPatient);
    
    return res.status(201).json(savedPatient);
    ;
  } catch (err) {
    return res.status(500).json(err);
  }
});


//create report 

router.post("/:id/create_report", verifyTokenAndAdmin, async (req, res) => {
    
    try {
        const searchId=req.params.id;
        //console.log('in create report', req.params.id);

        const patient = await Patient.findById(searchId);
        // if patient not found return error
        if(!patient){
            return res.status(404).json({ message: 'Patient not found' });
        }
        console.log("patent ",patient);
        const doctor=req.doctorObj;
        
        console.log("here",doctor.name);
        const newReport = await Report.create({
            status: req.body.status,
            patient: patient._id,
            doctorName:doctor.name,
            createdBy: doctor._id
           
        });
        //console.log('after report', newReport)
        if (!newReport) {
            return res.status(500).json({ error: "Failed to create report" });
          }
          try {
            patient.reports.push(newReport);
            await patient.save();
            //console.log('printing',newReport);
            return res.status(200).json(newReport);
          } catch (err) {
          //  console.error(err);
            return res.status(500).json("There was an error saving the report.");
          }
        
            console.log(newReport)
        


        return res.status(200).json(newReport);
    } catch (err) {
        return res.status(200).json(err);
    }
  });

// get all reports of user
  router.get("/:id/all_reports", verifyTokenAndAdmin, async (req, res) => {
    try {
        const searchId=req.params.id;
        // const patient = await Patient.findById(searchId);
        const patient = await Patient.findById(searchId)?.populate('reports');
        // if patient not found return error
        if(!patient){
            return res.status(404).json({ message: 'Patient not found' });
        }
        //const patient = await Patient.findById(patientId).populate('reports');
    return res.status(200).json(patient.reports);
        

    } catch (error) {
          return res.status(500).json({ message: 'There was an error in showing report.', error: error.message });
    }
  })

  
//GET particualar patient
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      //console.log('your patient is', patient)
      //if patient not found return 404 err
      if(!patient){
      return res.status(404).json('patient not found');
      }
      return res.status(200).json(patient);
    } catch (err) {
      return res.status(500).json(err);
    }
  });


//GET ALL patients
router.get("/findAll", verifyTokenAndAdmin, async (req, res) => {
  const query = "";
  // if you want latest x number of users, nedd sort added in below
  try {
    const patients = query
      ? await Patient.find().sort({ _id: -1 }).limit(5)
      : await Patient.find();
    return res.status(200).json(patients);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET patients STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  //last year today
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Patient.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    //_id will be mont , goupe by month
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
