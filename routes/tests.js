const express = require('express');
const LabTest = require('../models/LabTest');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Get all available lab tests
router.get('/', async (req, res) => {
  try {
    const tests = await LabTest.find({ isActive: true }).sort({ name: 1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single test by ID
router.get('/:id', async (req, res) => {
  try {
    const test = await LabTest.findById(req.params.id);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }
    res.json(test);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create sample tests (for development)
router.post('/seed', async (req, res) => {
  try {
    const sampleTests = [
      {
        name: 'Complete Blood Count (CBC)',
        description: 'A comprehensive blood test that evaluates overall health and detects various disorders',
        price: 25,
        duration: '2-3 hours',
        preparation: ['No special preparation required', 'Can be done any time of day'],
        category: 'Blood'
      },
      {
        name: 'Lipid Profile',
        description: 'Tests cholesterol levels and other fats in blood to assess heart disease risk',
        price: 35,
        duration: 'Same day',
        preparation: ['Fast for 12 hours before test', 'Only water allowed during fasting'],
        category: 'Blood'
      },
      {
        name: 'Thyroid Function Test',
        description: 'Measures thyroid hormone levels to check thyroid gland function',
        price: 45,
        duration: '1-2 days',
        preparation: ['No special preparation required', 'Take medications as prescribed'],
        category: 'Blood'
      },
      {
        name: 'Liver Function Test',
        description: 'Group of blood tests to check how well the liver is working',
        price: 40,
        duration: 'Same day',
        preparation: ['Fast for 8-12 hours', 'Avoid alcohol 24 hours before test'],
        category: 'Blood'
      },
      {
        name: 'Kidney Function Test',
        description: 'Tests to check how well kidneys are filtering waste from blood',
        price: 38,
        duration: '2-3 hours',
        preparation: ['Stay hydrated', 'No special diet restrictions'],
        category: 'Blood'
      }
    ];

    await LabTest.deleteMany({}); // Clear existing tests
    await LabTest.insertMany(sampleTests);
    
    res.json({ message: 'Sample tests created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;