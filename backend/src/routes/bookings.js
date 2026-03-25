const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Coach = require('../models/Coach');
const { protect, restrictTo } = require('../middleware/auth');

// POST /api/bookings — athlete creates booking
router.post('/', protect, restrictTo('athlete'), async (req, res) => {
  try {
    const { coachId, sessionType, date, timeSlot, duration, notes } = req.body;
    if (!coachId || !sessionType || !date || !timeSlot)
      return res.status(400).json({ message: 'Missing required booking fields.' });

    const coach = await Coach.findById(coachId);
    if (!coach) return res.status(404).json({ message: 'Coach not found.' });
    if (coach.approvalStatus !== 'approved')
      return res.status(400).json({ message: 'This coach is not available for bookings.' });

    const totalAmount = coach.hourlyRate * ((duration || 60) / 60);

    const booking = await Booking.create({
      athlete: req.user._id,
      coach: coachId,
      sessionType,
      date: new Date(date),
      timeSlot,
      duration: duration || 60,
      totalAmount,
      notes: notes || ''
    });

    res.status(201).json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/bookings/my — athlete sees their bookings
router.get('/my', protect, restrictTo('athlete'), async (req, res) => {
  try {
    const bookings = await Booking.find({ athlete: req.user._id })
      .populate('coach', 'name avatar city sports hourlyRate')
      .sort({ date: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/bookings/coach — coach sees their bookings
router.get('/coach', protect, restrictTo('coach'), async (req, res) => {
  try {
    const coachProfile = await Coach.findOne({ user: req.user._id });
    if (!coachProfile) return res.status(404).json({ message: 'Coach profile not found.' });

    const bookings = await Booking.find({ coach: coachProfile._id })
      .populate('athlete', 'name email city')
      .sort({ date: -1 });
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/bookings/:id/status — update booking status
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    booking.status = status;
    await booking.save();

    if (status === 'completed') {
      await Coach.findByIdAndUpdate(booking.coach, { $inc: { totalSessions: 1 } });
    }

    res.json({ booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
