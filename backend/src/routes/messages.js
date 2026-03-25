const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/messages/conversations
router.get('/conversations', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    }).sort({ createdAt: -1 });

    const seen = new Map();
    for (const msg of messages) {
      const otherId = msg.sender.toString() === userId.toString()
        ? msg.receiver.toString()
        : msg.sender.toString();
      if (!seen.has(otherId)) seen.set(otherId, msg);
    }

    const conversations = await Promise.all(
      Array.from(seen.entries()).map(async ([otherId, lastMsg]) => {
        const otherUser = await User.findById(otherId).select('name email role city');
        const unreadCount = await Message.countDocuments({
          sender: otherId,
          receiver: userId,
          read: false
        });
        return { user: otherUser, lastMessage: lastMsg, unreadCount };
      })
    );

    res.json({ conversations });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/messages/unread/count
router.get('/unread/count', protect, async (req, res) => {
  try {
    const count = await Message.countDocuments({ receiver: req.user._id, read: false });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET /api/messages/:userId
router.get('/:userId', protect, async (req, res) => {
  try {
    const myId = req.user._id;
    const otherId = req.params.userId;
    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: otherId },
        { sender: otherId, receiver: myId }
      ]
    }).sort({ createdAt: 1 });

    await Message.updateMany(
      { sender: otherId, receiver: myId, read: false },
      { read: true }
    );

    res.json({ messages });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

// POST /api/messages
router.post('/', protect, async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content?.trim())
      return res.status(400).json({ message: 'Receiver and content are required.' });

    const receiver = await User.findById(receiverId);
    if (!receiver) return res.status(404).json({ message: 'Recipient not found.' });

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      content: content.trim()
    });

    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
