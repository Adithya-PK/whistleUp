export interface Coach {
  id: string;
  name: string;
  avatar: string;
  city: string;
  sports: string[];
  bio: string;
  experience: number;
  hourlyRate: number;
  sessionTypes: string[];
  ageGroups: string[];
  isVerified: boolean;
  avgRating: number;
  totalSessions: number;
  certifications: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
}

export const mockCoaches: Coach[] = [
  {
    id: "1",
    name: "Arjun Krishnamurthy",
    avatar: "https://i.pravatar.cc/150?img=1",
    city: "Chennai",
    sports: ["Cricket", "Fitness"],
    bio: "Former Tamil Nadu Ranji Trophy player with 12 years of professional experience. I specialize in batting technique and mental conditioning for competitive players. Trained 200+ students from grassroots to state level.",
    experience: 12,
    hourlyRate: 1200,
    sessionTypes: ["In-Person", "Online"],
    ageGroups: ["Kids (6–14)", "Adults (15–54)"],
    isVerified: true,
    avgRating: 4.9,
    totalSessions: 342,
    certifications: ["BCCI Level 2 Certified Coach", "NIS Cricket Coaching Diploma", "Sports Psychology Certificate"],
    reviews: [
      { id: "r1", author: "Rohan Mehta", avatar: "https://i.pravatar.cc/150?img=11", rating: 5, text: "Arjun sir completely transformed my batting stance. His patient teaching style is incredible!", date: "March 2025" },
      { id: "r2", author: "Divya Nair", avatar: "https://i.pravatar.cc/150?img=12", rating: 5, text: "Best cricket coach in Chennai. My son improved dramatically in just 3 months.", date: "February 2025" },
      { id: "r3", author: "Karthik Subramanian", avatar: "https://i.pravatar.cc/150?img=13", rating: 5, text: "Highly knowledgeable about the game. Training sessions are always engaging and fun.", date: "January 2025" },
    ],
  },
  {
    id: "2",
    name: "Priya Venkataraman",
    avatar: "https://i.pravatar.cc/150?img=2",
    city: "Chennai",
    sports: ["Badminton"],
    bio: "State-level badminton champion and certified coach. I offer personalized training focusing on footwork, smash technique, and match strategy. Special programs for beginners and competitive youth players.",
    experience: 8,
    hourlyRate: 800,
    sessionTypes: ["In-Person"],
    ageGroups: ["Kids (6–14)", "Adults (15–54)"],
    isVerified: true,
    avgRating: 4.8,
    totalSessions: 215,
    certifications: ["BAI Level 2 Coach", "Sports Science Diploma", "Youth Coaching Certificate"],
    reviews: [
      { id: "r4", author: "Arun Kumar", avatar: "https://i.pravatar.cc/150?img=14", rating: 5, text: "Priya's footwork drills are unmatched. I've improved my court coverage significantly.", date: "March 2025" },
      { id: "r5", author: "Sneha Rajesh", avatar: "https://i.pravatar.cc/150?img=15", rating: 4, text: "Great coach with a systematic approach. My kids love training with her.", date: "February 2025" },
      { id: "r6", author: "Vijay Anand", avatar: "https://i.pravatar.cc/150?img=16", rating: 5, text: "Within 2 months I went from beginner to winning my club tournament. Amazing!", date: "January 2025" },
    ],
  },
  {
    id: "3",
    name: "Ravi Shankar Pillai",
    avatar: "https://i.pravatar.cc/150?img=3",
    city: "Bengaluru",
    sports: ["Football"],
    bio: "Ex-I-League player and UEFA-certified coach with a passion for grassroots development. I run structured football programs focusing on technical skills, teamwork, and physical conditioning.",
    experience: 10,
    hourlyRate: 1000,
    sessionTypes: ["In-Person", "Both"],
    ageGroups: ["Kids (6–14)", "Adults (15–54)"],
    isVerified: true,
    avgRating: 4.7,
    totalSessions: 289,
    certifications: ["UEFA C License", "AIFF D License", "First Aid & CPR Certified"],
    reviews: [
      { id: "r7", author: "Akash Reddy", avatar: "https://i.pravatar.cc/150?img=17", rating: 5, text: "Ravi's technical drills are top-notch. My passing and dribbling have improved massively.", date: "March 2025" },
      { id: "r8", author: "Pooja Sharma", avatar: "https://i.pravatar.cc/150?img=18", rating: 4, text: "Excellent coach. My son got selected for the school team after training here.", date: "February 2025" },
      { id: "r9", author: "Suresh Iyer", avatar: "https://i.pravatar.cc/150?img=19", rating: 5, text: "Very professional and encouraging. Best football coach in Bengaluru.", date: "January 2025" },
    ],
  },
  {
    id: "4",
    name: "Lakshmi Subramaniam",
    avatar: "https://i.pravatar.cc/150?img=4",
    city: "Bengaluru",
    sports: ["Yoga"],
    bio: "200-hour RYT certified yoga instructor specializing in therapeutic yoga for seniors and beginners. I offer gentle, mindful sessions tailored to your body's needs. Home visits available across Bengaluru.",
    experience: 7,
    hourlyRate: 600,
    sessionTypes: ["In-Person", "Online", "Both"],
    ageGroups: ["Adults (15–54)", "Seniors (55+)"],
    isVerified: true,
    avgRating: 5.0,
    totalSessions: 178,
    certifications: ["RYT 200 Certified", "Therapeutic Yoga Specialist", "Senior Wellness Coach"],
    reviews: [
      { id: "r10", author: "Meena Krishnan", avatar: "https://i.pravatar.cc/150?img=20", rating: 5, text: "Lakshmi's gentle approach is perfect for my age. My back pain has reduced significantly.", date: "March 2025" },
      { id: "r11", author: "Ramesh Babu", avatar: "https://i.pravatar.cc/150?img=21", rating: 5, text: "Excellent instructor. Very patient with seniors. I feel more flexible than I did 10 years ago!", date: "February 2025" },
      { id: "r12", author: "Anitha Sundaram", avatar: "https://i.pravatar.cc/150?img=22", rating: 5, text: "Truly life-changing sessions. Lakshmi makes yoga accessible for everyone.", date: "January 2025" },
    ],
  },
  {
    id: "5",
    name: "Muthu Karthikeyan",
    avatar: "https://i.pravatar.cc/150?img=5",
    city: "Mumbai",
    sports: ["Cricket"],
    bio: "Former Mumbai domestic cricket player now dedicated to coaching the next generation. Specializing in fast bowling, fielding, and match fitness. Trained players who have gone on to represent their states.",
    experience: 9,
    hourlyRate: 1500,
    sessionTypes: ["In-Person"],
    ageGroups: ["Kids (6–14)", "Adults (15–54)"],
    isVerified: true,
    avgRating: 4.8,
    totalSessions: 267,
    certifications: ["BCCI Level 3 Certified", "Physical Conditioning Specialist", "Youth Talent Identification"],
    reviews: [
      { id: "r13", author: "Nikhil Joshi", avatar: "https://i.pravatar.cc/150?img=23", rating: 5, text: "Muthu sir's bowling academy is the best in Mumbai. My son's pace increased by 10kmph!", date: "March 2025" },
      { id: "r14", author: "Priya Desai", avatar: "https://i.pravatar.cc/150?img=24", rating: 5, text: "Very professional setup. The video analysis sessions are particularly helpful.", date: "February 2025" },
      { id: "r15", author: "Rahul Patil", avatar: "https://i.pravatar.cc/150?img=25", rating: 4, text: "Great coach who really understands cricket. Highly recommended for serious players.", date: "January 2025" },
    ],
  },
  {
    id: "6",
    name: "Sunita Nambiar",
    avatar: "https://i.pravatar.cc/150?img=6",
    city: "Mumbai",
    sports: ["Yoga", "Pilates"],
    bio: "Certified Pilates instructor and yoga teacher with expertise in posture correction, core strengthening, and stress relief. I help corporate professionals and seniors regain strength and flexibility.",
    experience: 6,
    hourlyRate: 900,
    sessionTypes: ["Online", "Both"],
    ageGroups: ["Adults (15–54)", "Seniors (55+)"],
    isVerified: true,
    avgRating: 4.9,
    totalSessions: 143,
    certifications: ["STOTT PILATES Certified", "RYT 200 Yoga Alliance", "Corporate Wellness Specialist"],
    reviews: [
      { id: "r16", author: "Kavya Mehta", avatar: "https://i.pravatar.cc/150?img=26", rating: 5, text: "Sunita's online Pilates classes are incredible. My posture has improved drastically.", date: "March 2025" },
      { id: "r17", author: "Ashish Verma", avatar: "https://i.pravatar.cc/150?img=27", rating: 5, text: "The combination of yoga and Pilates is exactly what I needed for my desk job pain.", date: "February 2025" },
      { id: "r18", author: "Rekha Kulkarni", avatar: "https://i.pravatar.cc/150?img=28", rating: 5, text: "Wonderful instructor! My elderly mother loves the gentle sessions. Very patient.", date: "January 2025" },
    ],
  },
  {
    id: "7",
    name: "Senthilkumar Rajan",
    avatar: "https://i.pravatar.cc/150?img=7",
    city: "Chennai",
    sports: ["Badminton", "Fitness"],
    bio: "National-level badminton player and certified sports trainer. I offer comprehensive badminton coaching with emphasis on physical fitness, reaction speed, and tournament preparation.",
    experience: 11,
    hourlyRate: 1000,
    sessionTypes: ["In-Person", "Both"],
    ageGroups: ["Kids (6–14)", "Adults (15–54)"],
    isVerified: true,
    avgRating: 4.7,
    totalSessions: 312,
    certifications: ["BAI National Coach", "Strength & Conditioning Cert", "Sports Nutrition Diploma"],
    reviews: [
      { id: "r19", author: "Gopal Krishnan", avatar: "https://i.pravatar.cc/150?img=29", rating: 5, text: "Senthil sir is the most dedicated coach I've trained with. My game improved 10x.", date: "March 2025" },
      { id: "r20", author: "Shanthi Murugan", avatar: "https://i.pravatar.cc/150?img=30", rating: 4, text: "Great technical knowledge and structured training plans. Highly recommend.", date: "February 2025" },
      { id: "r21", author: "Balaji Venkat", avatar: "https://i.pravatar.cc/150?img=31", rating: 5, text: "Excellent coach. The fitness-focused approach to badminton is unique and effective.", date: "January 2025" },
    ],
  },
  {
    id: "8",
    name: "Deepa Raghunathan",
    avatar: "https://i.pravatar.cc/150?img=8",
    city: "Bengaluru",
    sports: ["Yoga", "Stretching"],
    bio: "Specialized in therapeutic yoga and assisted stretching for injury recovery and prevention. I work with athletes and seniors to improve flexibility, mobility, and overall wellbeing.",
    experience: 5,
    hourlyRate: 500,
    sessionTypes: ["In-Person", "Online", "Both"],
    ageGroups: ["Adults (15–54)", "Seniors (55+)"],
    isVerified: true,
    avgRating: 4.8,
    totalSessions: 98,
    certifications: ["RYT 300 Certified", "Assisted Stretching Specialist", "Pain Management Through Yoga"],
    reviews: [
      { id: "r22", author: "Radha Gopalan", avatar: "https://i.pravatar.cc/150?img=32", rating: 5, text: "Deepa helped me recover from my knee injury. Her stretching techniques are amazing.", date: "March 2025" },
      { id: "r23", author: "Vikram Suresh", avatar: "https://i.pravatar.cc/150?img=33", rating: 5, text: "As a runner, the flexibility sessions have drastically improved my performance.", date: "February 2025" },
      { id: "r24", author: "Malathi Ravi", avatar: "https://i.pravatar.cc/150?img=34", rating: 4, text: "Very professional and caring. Perfect for seniors who want to stay active.", date: "January 2025" },
    ],
  },
  {
    id: "9",
    name: "Prakash Narayanan",
    avatar: "https://i.pravatar.cc/150?img=9",
    city: "Mumbai",
    sports: ["Pilates", "Stretching"],
    bio: "Celebrity fitness trainer and Pilates specialist. I offer premium one-on-one training focusing on body composition, athletic performance, and functional movement.",
    experience: 15,
    hourlyRate: 1500,
    sessionTypes: ["In-Person", "Online"],
    ageGroups: ["Adults (15–54)", "Seniors (55+)"],
    isVerified: true,
    avgRating: 4.9,
    totalSessions: 456,
    certifications: ["Master Pilates Instructor", "CSCS Certified Strength Coach", "Functional Movement Specialist"],
    reviews: [
      { id: "r25", author: "Ananya Singh", avatar: "https://i.pravatar.cc/150?img=35", rating: 5, text: "Prakash is the best trainer I've ever had. His knowledge of body mechanics is exceptional.", date: "March 2025" },
      { id: "r26", author: "Mihir Shah", avatar: "https://i.pravatar.cc/150?img=36", rating: 5, text: "Incredible results in just 2 months. The Pilates + stretching combo is fantastic.", date: "February 2025" },
      { id: "r27", author: "Shweta Jain", avatar: "https://i.pravatar.cc/150?img=37", rating: 5, text: "Worth every rupee. Prakash tailors every session to your specific needs.", date: "January 2025" },
    ],
  },
];

export const mockBookings = [
  { id: "b1", athlete: "Rohan Mehta", date: "March 20, 2025", sessionType: "In-Person", status: "Upcoming" },
  { id: "b2", athlete: "Divya Nair", date: "March 15, 2025", sessionType: "Online", status: "Completed" },
  { id: "b3", athlete: "Karthik Raja", date: "March 10, 2025", sessionType: "In-Person", status: "Cancelled" },
];
