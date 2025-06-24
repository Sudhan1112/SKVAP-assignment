const mongoose = require('mongoose');

const labTestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  duration: {
    type: String,
    required: true // e.g., "2-3 hours", "Same day"
  },
  preparation: {
    type: [String], // Array of preparation instructions
    default: []
  },
  category: {
    type: String,
    enum: ['Blood', 'Urine', 'Stool', 'Other'],
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LabTest', labTestSchema);