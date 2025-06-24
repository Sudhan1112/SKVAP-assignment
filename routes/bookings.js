const express = require('express');
const Booking = require('../models/Booking');
const LabTest = require('../models/LabTest');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Book a test
router.post('/book', authMiddleware, async (req, res) => {
  try {
    const { testId, bookingDate, preferredTime, notes } = req.body;

    // Validate test exists
    const test = await LabTest.findById(testId);
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    // Check if booking date is in the future
    const selectedDate = new Date(bookingDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    // Create booking
    const booking = new Booking({
      patient: req.patient._id,
      labTest: testId,
      bookingDate: selectedDate,
      preferredTime,
      notes: notes || ''
    });

    await booking.save();

    // Populate the booking with test and patient details
    const populatedBooking = await Booking.findById(booking._id)
      .populate('labTest', 'name price duration')
      .populate('patient', 'name email');

    res.status(201).json({
      message: 'Test booked successfully',
      booking: populatedBooking
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get patient's bookings
router.get('/my-bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ patient: req.patient._id })
      .populate('labTest', 'name price duration category')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Cancel booking
router.patch('/cancel/:bookingId', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      patient: req.patient._id
    });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ message: 'Cannot cancel completed booking' });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get dummy report (simulates PDF download)
router.get('/report/:bookingId', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      patient: req.patient._id
    }).populate('labTest', 'name').populate('patient', 'name');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Simulate report generation
    const reportData = {
      bookingId: booking._id,
      patientName: booking.patient.name,
      testName: booking.labTest.name,
      reportDate: new Date().toISOString(),
      results: {
        status: 'Normal',
        values: [
          { parameter: 'Hemoglobin', value: '14.2 g/dL', range: '12.0-16.0 g/dL' },
          { parameter: 'WBC Count', value: '7,200/μL', range: '4,000-11,000/μL' },
          { parameter: 'Platelet Count', value: '250,000/μL', range: '150,000-450,000/μL' }
        ]
      },
      summary: 'All parameters are within normal limits. No immediate concerns detected.'
    };

    // Mark report as ready
    booking.reportReady = true;
    await booking.save();

    res.json({
      message: 'Report generated successfully',
      report: reportData
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;