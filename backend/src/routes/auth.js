const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Coach = require('../models/Coach');

const signToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, city } = req.body;

    if (!name || !email || !password || !city)
      return res.status(400).json({ message: 'Please provide all required fields.' });

    if (!['athlete', 'coach'].includes(role))
      return res.status(400).json({ message: 'Role must be athlete or coach.' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already registered.' });

    const user = await User.create({ name, email, password, role, city });

    if (role === 'coach') {
      await Coach.create({
        user: user._id,
        name: user.name,
        email: user.email,
        city: user.city,
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 50)}.jpg`,
        approvalStatus: 'pending'
      });
    }

    const token = signToken(user._id, user.role);
    res.status(201).json({ token, user });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error during signup.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(
        { id: 'admin', role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
      return res.json({
        token,
        user: { _id: 'admin', name: 'Admin', email, role: 'admin', city: 'HQ' }
      });
    }

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password.' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: 'Invalid email or password.' });

    if (user.role === 'coach') {
      const coachProfile = await Coach.findOne({ user: user._id });
      if (coachProfile && coachProfile.approvalStatus === 'pending') {
        return res.status(403).json({
          message: 'Your coach account is pending admin approval.',
          approvalStatus: 'pending'
        });
      }
      if (coachProfile && coachProfile.approvalStatus === 'rejected') {
        return res.status(403).json({
          message: `Your account was rejected. ${coachProfile.adminNote ? 'Reason: ' + coachProfile.adminNote : ''}`,
          approvalStatus: 'rejected'
        });
      }
    }

    const token = signToken(user._id, user.role);
    res.json({ token, user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', require('../middleware/auth').protect, async (req, res) => {
  try {
    if (req.user.role === 'admin') return res.json({ user: req.user });
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
