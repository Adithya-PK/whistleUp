const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  authorName: String,
  authorAvatar: String,
  rating: { type: Number, min: 1, max: 5, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const coachSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, default: '' },
  city: { type: String, required: true },
  sports: [{ type: String }],
  bio: { type: String, default: '' },
  experience: { type: Number, default: 0 },
  hourlyRate: { type: Number, default: 500 },
  sessionTypes: [{ type: String, enum: ['In-Person', 'Online', 'Both'] }],
  ageGroups: [{ type: String }],
  certifications: [{ type: String }],
  reviews: [reviewSchema],
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  adminNote: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: { type: Date },
  isVerified: { type: Boolean, default: false },
  avgRating: { type: Number, default: 0 },
  totalSessions: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

coachSchema.methods.recalcRating = function () {
  if (this.reviews.length === 0) { this.avgRating = 0; return; }
  const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
  this.avgRating = Math.round((sum / this.reviews.length) * 10) / 10;
};

module.exports = mongoose.model('Coach', coachSchema);
