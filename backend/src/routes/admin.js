const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const User = require('../models/User');
const Booking = require('../models/Booking');
const { protect, restrictTo } = require('../middleware/auth');

const adminOnly = [protect, restrictTo('admin')];

// GET /api/admin/stats
router.get('/stats', ...adminOnly, async (req, res) => {
  try {
    const [totalUsers, totalCoaches, pendingCoaches, approvedCoaches, rejectedCoaches, totalBookings] = await Promise.all([
      User.countDocuments(),
      Coach.countDocuments(),
      Coach.countDocuments({ approvalStatus: 'pending' }),
      Coach.countDocuments({ approvalStatus: 'approved' }),
      Coach.countDocuments({ approvalStatus: 'rejected' }),
      Booking.countDocuments()
    ]);
    res.json({ totalUsers, totalCoaches, pendingCoaches, approvedCoaches, rejectedCoaches, totalBookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/coaches
router.get('/coaches', ...adminOnly, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { approvalStatus: status } : {};
    const coaches = await Coach.find(query).sort({ submittedAt: -1 });
    res.json({ coaches });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/coaches/pending
router.get('/coaches/pending', ...adminOnly, async (req, res) => {
  try {
    const coaches = await Coach.find({ approvalStatus: 'pending' }).sort({ submittedAt: -1 });
    res.json({ coaches, count: coaches.length });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/admin/coaches/:id/approve
router.put('/coaches/:id/approve', ...adminOnly, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found.' });
    coach.approvalStatus = 'approved';
    coach.isVerified = true;
    coach.reviewedAt = new Date();
    coach.adminNote = req.body.note || '';
    await coach.save();
    res.json({ message: 'Coach approved successfully.', coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/admin/coaches/:id/reject
router.put('/coaches/:id/reject', ...adminOnly, async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found.' });
    coach.approvalStatus = 'rejected';
    coach.isVerified = false;
    coach.reviewedAt = new Date();
    coach.adminNote = req.body.note || 'Application rejected by admin.';
    await coach.save();
    res.json({ message: 'Coach rejected.', coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/admin/users
router.get('/users', ...adminOnly, async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
