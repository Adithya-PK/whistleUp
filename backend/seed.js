require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Coach = require('./src/models/Coach');

const seedData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  await User.deleteMany({ role: { $in: ['athlete', 'coach'] } });
  await Coach.deleteMany({});
  console.log('🗑️  Cleared existing data');

  const hashedPassword = await bcrypt.hash('demo123', 12);

  const coachesData = [
    {
      name: 'Arjun Krishnamurthy', email: 'arjun@demo.com', city: 'Chennai',
      sports: ['Cricket', 'Fitness'],
      bio: 'Former Tamil Nadu Ranji Trophy player with 12 years of professional experience.',
      experience: 12, hourlyRate: 1200, sessionTypes: ['In-Person', 'Online'],
      ageGroups: ['Kids (6–14)', 'Adults (15–54)'],
      certifications: ['BCCI Level 2 Certified Coach', 'NIS Cricket Coaching Diploma'],
      avgRating: 4.9, totalSessions: 342,
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Priya Venkataraman', email: 'priya@demo.com', city: 'Chennai',
      sports: ['Badminton'],
      bio: 'State-level badminton champion and certified coach.',
      experience: 8, hourlyRate: 800, sessionTypes: ['In-Person'],
      ageGroups: ['Kids (6–14)', 'Adults (15–54)'],
      certifications: ['BAI Level 2 Coach', 'Sports Science Diploma'],
      avgRating: 4.8, totalSessions: 215,
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Ravi Shankar Pillai', email: 'ravi@demo.com', city: 'Bengaluru',
      sports: ['Football'],
      bio: 'Ex-I-League player and UEFA-certified coach.',
      experience: 10, hourlyRate: 1000, sessionTypes: ['In-Person', 'Both'],
      ageGroups: ['Kids (6–14)', 'Adults (15–54)'],
      certifications: ['UEFA C License', 'AIFF D License'],
      avgRating: 4.7, totalSessions: 289,
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
    },
    {
      name: 'Lakshmi Subramaniam', email: 'lakshmi@demo.com', city: 'Bengaluru',
      sports: ['Yoga'],
      bio: 'Specialized in therapeutic yoga for seniors and beginners.',
      experience: 7, hourlyRate: 600, sessionTypes: ['In-Person', 'Online', 'Both'],
      ageGroups: ['Adults (15–54)', 'Seniors (55+)'],
      certifications: ['RYT 200 Certified', 'Therapeutic Yoga Specialist'],
      avgRating: 5.0, totalSessions: 178,
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
    },
    {
      name: 'Muthu Karthikeyan', email: 'muthu@demo.com', city: 'Mumbai',
      sports: ['Cricket'],
      bio: 'Former Mumbai domestic cricket player now dedicated to coaching.',
      experience: 9, hourlyRate: 1500, sessionTypes: ['In-Person'],
      ageGroups: ['Kids (6–14)', 'Adults (15–54)'],
      certifications: ['BCCI Level 3 Certified'],
      avgRating: 4.8, totalSessions: 267,
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
    },
    {
      name: 'Sunita Nambiar', email: 'sunita@demo.com', city: 'Mumbai',
      sports: ['Yoga', 'Pilates'],
      bio: 'Certified Pilates instructor and yoga teacher.',
      experience: 6, hourlyRate: 900, sessionTypes: ['Online', 'Both'],
      ageGroups: ['Adults (15–54)', 'Seniors (55+)'],
      certifications: ['STOTT PILATES Certified', 'RYT 200 Yoga Alliance'],
      avgRating: 4.9, totalSessions: 143,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
    },
    {
      name: 'Senthilkumar Rajan', email: 'senthil@demo.com', city: 'Chennai',
      sports: ['Badminton', 'Fitness'],
      bio: 'National-level badminton player and certified sports trainer.',
      experience: 11, hourlyRate: 1000, sessionTypes: ['In-Person', 'Both'],
      ageGroups: ['Kids (6–14)', 'Adults (15–54)'],
      certifications: ['BAI National Coach', 'Strength & Conditioning Cert'],
      avgRating: 4.7, totalSessions: 312,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
    },
    {
      name: 'Deepa Raghunathan', email: 'deepa@demo.com', city: 'Bengaluru',
      sports: ['Yoga', 'Stretching'],
      bio: 'Specialized in therapeutic yoga and assisted stretching.',
      experience: 5, hourlyRate: 500, sessionTypes: ['In-Person', 'Online', 'Both'],
      ageGroups: ['Adults (15–54)', 'Seniors (55+)'],
      certifications: ['RYT 300 Certified', 'Assisted Stretching Specialist'],
      avgRating: 4.8, totalSessions: 98,
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
    },
    {
      name: 'Prakash Narayanan', email: 'prakash@demo.com', city: 'Mumbai',
      sports: ['Pilates', 'Stretching'],
      bio: 'Celebrity fitness trainer and Pilates specialist.',
      experience: 15, hourlyRate: 1500, sessionTypes: ['In-Person', 'Online'],
      ageGroups: ['Adults (15–54)', 'Seniors (55+)'],
      certifications: ['Master Pilates Instructor', 'CSCS Certified Strength Coach'],
      avgRating: 4.9, totalSessions: 456,
      avatar: 'https://randomuser.me/api/portraits/men/9.jpg'
    }
  ];

  for (const d of coachesData) {
    const user = await User.create({
      name: d.name, email: d.email,
      password: hashedPassword, role: 'coach', city: d.city
    });
    await Coach.create({
      user: user._id, name: d.name, email: d.email,
      city: d.city, avatar: d.avatar, sports: d.sports,
      bio: d.bio, experience: d.experience, hourlyRate: d.hourlyRate,
      sessionTypes: d.sessionTypes, ageGroups: d.ageGroups,
      certifications: d.certifications, avgRating: d.avgRating,
      totalSessions: d.totalSessions,
      approvalStatus: 'approved', isVerified: true
    });
    console.log(`✅ Seeded coach: ${d.name}`);
  }

  // Demo athlete
  await User.create({
    name: 'Rohan Mehta', email: 'athlete@demo.com',
    password: hashedPassword, role: 'athlete', city: 'Mumbai'
  });
  console.log('✅ Seeded athlete: athlete@demo.com / demo123');

  // Pending coach for admin testing
  const pendingUser = await User.create({
    name: 'New Coach Demo', email: 'newcoach@demo.com',
    password: hashedPassword, role: 'coach', city: 'Chennai'
  });
  await Coach.create({
    user: pendingUser._id, name: 'New Coach Demo',
    email: 'newcoach@demo.com', city: 'Chennai',
    sports: ['Cricket'], bio: 'New coach awaiting approval.',
    experience: 3, hourlyRate: 700,
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    approvalStatus: 'pending', isVerified: false
  });
  console.log('✅ Seeded pending coach: newcoach@demo.com / demo123');

  console.log('\n🎉 Seed complete!');
  console.log('─────────────────────────────');
  console.log('Coach login:   arjun@demo.com / demo123');
  console.log('Athlete login: athlete@demo.com / demo123');
  console.log('Pending coach: newcoach@demo.com / demo123');
  console.log('Admin login:   admin@whistleup.com / admin123');
  console.log('─────────────────────────────');

  process.exit(0);
};

seedData().catch(err => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
