const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const patient = await Patient.findById(decoded.patientId);
    
    if (!patient) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.patient = patient;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;