const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  athlete: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'Coach', required: true },
  sessionType: { type: String, enum: ['In-Person', 'Online'], required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },
  duration: { type: Number, default: 60 },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: { type: Number },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
