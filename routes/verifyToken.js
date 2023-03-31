const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.token;
  // console.log('here in verify')

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    //console.log('here in verify nec', token)

    // jwt.verify(token, process.env.JWT_SEC, (err, doctor) => {
    //   if (err) {
    //     res.status(403).json("Token is not valid!");
    //     return;
    //   }
    //   req.doctor = doctor;
    //   next();
    // });
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SEC);
      const doctor = await Doctor.findById(decodedToken.id);

      if (!doctor) {
        return res.status(403).json("Token is not valid!");
      }

      req.doctor = doctor;
      next();
    } catch (err) {
      console.error(err);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(403).json("Token has expired!");
      } else {
        return res.status(403).json("Token is not valid!");
      }
    }

  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  console.log("in verify token");
  verifyToken(req, res, () => {
    //   console.log(req.params.id, 'hernexyer', req.user);

    if (req.doctor.id === req.params.id || req.doctor.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
      return;
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  //console.log('here in verify tokenA')
  verifyToken(req, res, () => {
    if (req.doctor.isAdmin) {
      //  console.log('here in verify tokenA is asadmin')
      req.doctorObj = req.doctor;
      //console.log("sdfjkdhgkdjhf", req.doctor.name);
      next();
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};
const findDoctor = (req, res, next) => {
  //console.log('here in verify tokenA')
  verifyToken(req, res, () => {
    if (req.doctor.isAdmin) {
      console.log("here in find doc", req.doctor);
      return next(req.doctor);
    } else {
      return res.status(403).json("You are not alowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  findDoctor,
};
