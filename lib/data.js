import { Music, Guitar, Piano, Mic2, Disc, Waves, Mic } from "lucide-react";

export const instruments = [
  {
    id: "guitar",
    name: "Guitar",
    icon: <Guitar size={48} strokeWidth={1} />,
    subtitle: "Acoustic, electric & fingerstyle",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=800&q=80",
    description:
      "Build rhythm, chords and confidence through songs you actually want to play.",
    skills: ["Strings", "Chords", "Rhythm"],
    teacher: "Aarav Mehta",
    basePrice: 1499,
  },
  {
    id: "piano",
    name: "Piano",
    icon: <Piano size={48} strokeWidth={1} />,
    subtitle: "Pop, classical & contemporary",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80",
    description:
      "From reading your first notes to playing complete pieces with expression.",
    skills: ["Keys", "Melody", "Harmony"],
    teacher: "Maya Rao",
    basePrice: 1799,
  },
  {
    id: "drums",
    name: "Drums",
    icon: <Disc size={48} strokeWidth={1} />,
    subtitle: "Groove, technique & live playing",
    image: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?auto=format&fit=crop&w=800&q=80",
    description:
      "Learn timing, fills and the confidence to lock into any song.",
    skills: ["Rhythm", "Energy", "Groove"],
    teacher: "Kabir Shah",
    basePrice: 1699,
  },
  {
    id: "vocals",
    name: "Vocals",
    icon: <Mic2 size={48} strokeWidth={1} />,
    subtitle: "Control, confidence & performance",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80",
    description:
      "Train your voice safely while building pitch, control and stage presence.",
    skills: ["Breath", "Pitch", "Control"],
    teacher: "Naina Kapoor",
    basePrice: 1599,
  },
  {
    id: "violin",
    name: "Violin",
    icon: <Waves size={48} strokeWidth={1} />,
    subtitle: "Classical & Strings",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80",
    description:
      "Master bowing techniques and expressive melodies on the violin.",
    skills: ["Strings", "Expression", "Soul"],
    teacher: "Rohan Das",
    basePrice: 1699,
  },
  {
    id: "saxophone",
    name: "Saxophone",
    icon: <Music size={48} strokeWidth={1} />,
    subtitle: "Jazz & Blues",
    image: "https://images.unsplash.com/photo-1525994886773-080587e161c2?auto=format&fit=crop&w=800&q=80",
    description:
      "Learn breath control and jazz improvisation to find your unique sound.",
    skills: ["Breath", "Scales", "Improv"],
    teacher: "Karan Singh",
    basePrice: 1899,
  },
];

export const teachers = [
  {
    name: "Aarav Mehta",
    instrument: "Guitar",
    experience: "12 yrs",
    image: "https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&w=800&q=80",
    focus: "Rock • Blues • Acoustic",
    rating: 4.9,
    students: 86,
  },
  {
    name: "Maya Rao",
    instrument: "Piano",
    experience: "9 yrs",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=800&q=80",
    focus: "Pop • Classical • Film",
    rating: 4.95,
    students: 112,
  },
  {
    name: "Kabir Shah",
    instrument: "Drums",
    experience: "8 yrs",
    image: "https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?auto=format&fit=crop&w=800&q=80",
    focus: "Funk • Rock • Jazz",
    rating: 4.85,
    students: 64,
  },
  {
    name: "Naina Kapoor",
    instrument: "Vocals",
    experience: "10 yrs",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80",
    focus: "Contemporary • Indie • Classical",
    rating: 5.0,
    students: 94,
  },
  {
    name: "Rohan Das",
    instrument: "Violin",
    experience: "15 yrs",
    image: "https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?auto=format&fit=crop&w=800&q=80",
    focus: "Classical • Orchestra • Fusion",
    rating: 4.9,
    students: 58,
  },
  {
    name: "Karan Singh",
    instrument: "Saxophone",
    experience: "11 yrs",
    image: "https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?auto=format&fit=crop&w=800&q=80",
    focus: "Jazz • Blues • Soul",
    rating: 4.92,
    students: 73,
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
