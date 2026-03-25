const express = require('express');
const router = express.Router();
const Coach = require('../models/Coach');
const { protect, restrictTo } = require('../middleware/auth');

// GET /api/coaches — public, only approved coaches
router.get('/', async (req, res) => {
  try {
    const { city, sport, sessionType, search } = req.query;
    const query = { approvalStatus: 'approved' };
    if (city) query.city = city;
    if (sport) query.sports = { $in: [sport] };
    if (sessionType) query.sessionTypes = { $in: [sessionType, 'Both'] };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sports: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    const coaches = await Coach.find(query).sort({ avgRating: -1 });
    res.json({ coaches });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/coaches/my/profile — coach sees own profile
router.get('/my/profile', protect, restrictTo('coach'), async (req, res) => {
  try {
    const coach = await Coach.findOne({ user: req.user._id });
    if (!coach) return res.status(404).json({ message: 'Coach profile not found.' });
    res.json({ coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/coaches/:id — public single coach
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found.' });
    res.json({ coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// PUT /api/coaches/profile — coach updates own profile
router.put('/profile', protect, restrictTo('coach'), async (req, res) => {
  try {
    const { bio, hourlyRate, sports, sessionTypes, ageGroups, certifications, experience } = req.body;
    const coach = await Coach.findOne({ user: req.user._id });
    if (!coach) return res.status(404).json({ message: 'Coach profile not found.' });

    if (bio !== undefined) coach.bio = bio;
    if (hourlyRate !== undefined) coach.hourlyRate = hourlyRate;
    if (sports !== undefined) coach.sports = sports;
    if (sessionTypes !== undefined) coach.sessionTypes = sessionTypes;
    if (ageGroups !== undefined) coach.ageGroups = ageGroups;
    if (certifications !== undefined) coach.certifications = certifications;
    if (experience !== undefined) coach.experience = experience;
    coach.updatedAt = new Date();

    await coach.save();
    res.json({ coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/coaches/:id/reviews — athlete adds review
router.post('/:id/reviews', protect, restrictTo('athlete'), async (req, res) => {
  try {
    const { rating, text } = req.body;
    if (!rating || !text) return res.status(400).json({ message: 'Rating and text required.' });

    const coach = await Coach.findById(req.params.id);
    if (!coach) return res.status(404).json({ message: 'Coach not found.' });

    const already = coach.reviews.find(r => r.author.toString() === req.user._id.toString());
    if (already) return res.status(400).json({ message: 'You have already reviewed this coach.' });

    coach.reviews.push({
      author: req.user._id,
      authorName: req.user.name,
      authorAvatar: `https://i.pravatar.cc/40?u=${req.user.email}`,
      rating,
      text
    });
    coach.recalcRating();
    await coach.save();
    res.status(201).json({ coach });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
