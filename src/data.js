export const instruments = [
  {
    id: "guitar",
    name: "Guitar",
    icon: "🎸",
    tone: "orange",
    subtitle: "Acoustic, electric & fingerstyle",
    description:
      "Build rhythm, chords and confidence through songs you actually want to play.",
    skills: ["Chords", "Strumming", "Improvisation", "Songwriting"],
    teacher: "Aarav Mehta",
    basePrice: 1499,
  },
  {
    id: "piano",
    name: "Piano",
    icon: "🎹",
    tone: "lavender",
    subtitle: "Pop, classical & contemporary",
    description:
      "From reading your first notes to playing complete pieces with expression.",
    skills: ["Technique", "Theory", "Pop", "Classical"],
    teacher: "Maya Rao",
    basePrice: 1799,
  },
  {
    id: "drums",
    name: "Drums",
    icon: "🥁",
    tone: "peach",
    subtitle: "Groove, technique & live playing",
    description:
      "Learn timing, fills and the confidence to lock into any song.",
    skills: ["Groove", "Fills", "Timing", "Performance"],
    teacher: "Kabir Shah",
    basePrice: 1699,
  },
  {
    id: "vocals",
    name: "Vocals",
    icon: "🎤",
    tone: "lime",
    subtitle: "Control, confidence & performance",
    description:
      "Train your voice safely while building pitch, control and stage presence.",
    skills: ["Breath", "Pitch", "Control", "Performance"],
    teacher: "Naina Kapoor",
    basePrice: 1599,
  },
];

export const teachers = [
  {
    name: "Aarav Mehta",
    instrument: "Guitar",
    experience: "12 yrs",
    focus: "Rock • Blues • Acoustic",
    rating: 4.9,
    students: 86,
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Maya Rao",
    instrument: "Piano",
    experience: "9 yrs",
    focus: "Pop • Classical • Film",
    rating: 5.0,
    students: 64,
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Kabir Shah",
    instrument: "Drums",
    experience: "10 yrs",
    focus: "Rock • Funk • Live",
    rating: 4.8,
    students: 51,
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
];

export const classes = [
  {
    day: "Mon",
    time: "6:30 PM",
    instrument: "Guitar",
    level: "Beginner",
    teacher: "Aarav Mehta",
    spots: 2,
  },
  {
    day: "Mon",
    time: "7:30 PM",
    instrument: "Piano",
    level: "Beginner",
    teacher: "Maya Rao",
    spots: 4,
  },
  {
    day: "Tue",
    time: "5:00 PM",
    instrument: "Vocals",
    level: "Beginner",
    teacher: "Naina Kapoor",
    spots: 3,
  },
  {
    day: "Tue",
    time: "6:30 PM",
    instrument: "Drums",
    level: "Beginner",
    teacher: "Kabir Shah",
    spots: 1,
  },
  {
    day: "Wed",
    time: "7:00 PM",
    instrument: "Guitar",
    level: "Intermediate",
    teacher: "Aarav Mehta",
    spots: 3,
  },
  {
    day: "Thu",
    time: "6:00 PM",
    instrument: "Piano",
    level: "Intermediate",
    teacher: "Maya Rao",
    spots: 2,
  },
];

export const faqs = [
  [
    "Do I need prior experience?",
    "No. Our beginner tracks start from zero, and we also place experienced learners into level-appropriate groups.",
  ],
  [
    "Can I choose online or in-person?",
    "Yes. Most classes are available in-studio and online, depending on the instrument and teacher.",
  ],
  [
    "How often should I practice?",
    "We design plans around real schedules. Even 15–20 focused minutes most days can move a beginner forward.",
  ],
  [
    "What ages do you teach?",
    "We currently teach ages 8+, teens, college students and adults with dedicated pathways for each.",
  ],
];
