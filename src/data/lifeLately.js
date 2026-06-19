import uhack1 from '../assets/U_hack 4.0/Cover.jpeg';
import uhack2 from '../assets/U_hack 4.0/WhatsApp Image 2026-06-19 at 22.35.39.jpeg';

import ted1 from '../assets/Ted_Talks/WhatsApp Image 2026-06-19 at 22.38.13.jpeg';
import ted2 from '../assets/Ted_Talks/WhatsApp Image 2026-06-19 at 22.38.13 (1).jpeg';

import college1 from '../assets/college events/WhatsApp Image 2026-06-19 at 22.30.43.jpeg';
import college2 from '../assets/college events/WhatsApp Image 2026-06-19 at 22.30.43 (1).jpeg';
import college3 from '../assets/college events/WhatsApp Image 2026-06-19 at 22.30.44.jpeg';
import college4 from '../assets/college events/WhatsApp Image 2026-06-19 at 22.30.44 (1).jpeg';

import tech1 from '../assets/Tech_events/cover_img.jpeg';

export const LIFE_LATELY_EVENTS = [
  {
    id: 'uhack',
    title: 'UHACK 4.0',
    category: 'Hackathon',
    description: 'Competed in one of the largest hackathons, collaborated with talented developers, solved real-world problems, and secured a Top 20 finish among hundreds of participants.',
    date: 'October 2025',
    location: 'Delhi NCR, India',
    coverImage: uhack1,
    images: [uhack1, uhack2],
    narrative: 'UHack 4.0 was an intense 36-hour hackathon where we brainstormed, designed, and developed an innovative solution under tight constraints. Competing against hundreds of talented teams, we built a working prototype, integrated databases, and pitched our solution to industry veteran judges. This experience refined my ability to build solutions under pressure, think on my feet, and collaborate seamlessly in high-stress environments.',
    takeaways: ['Problem Solving', 'Team Collaboration', 'Innovation', 'Rapid Prototyping'],
    highlights: [
      'Developed a full-stack working prototype in under 36 hours.',
      'Secured a Top 20 finish out of hundreds of talented developer teams.',
      'Collaborated effectively across designer and developer skillsets.'
    ],
    quotes: [
      'One of the most intense and rewarding experiences of my journey.',
      'Met incredible people who continue to inspire me.'
    ]
  },
  {
    id: 'ted-talks',
    title: 'TED TALKS 2025',
    category: 'Conference',
    description: 'Attended inspiring talks from industry leaders, innovators, and entrepreneurs while gaining insights into technology, leadership, and personal growth.',
    date: 'February 2025',
    location: 'Auditorium Main Stage',
    coverImage: ted1,
    images: [ted1, ted2],
    narrative: 'Attending TED Talks 2025 was a highly inspiring experience that broadened my horizons beyond core technical learning. Hearing stories from industry pioneers, innovators, and leaders about their setbacks and triumphs highlighted the critical importance of storytelling, visual communication, and human-centric design. It was a catalyst for thinking about technology not just as code, but as a tool to solve human problems.',
    takeaways: ['Leadership', 'Public Speaking', 'Inspiration', 'Networking'],
    highlights: [
      'Gained deep insights into emerging industry trends and ethical technology design.',
      'Networked with passionate students, developers, and industry keynote speakers.',
      'Participated in interactive roundtables on future human-AI collaborations.'
    ],
    quotes: [
      'Gained valuable perspectives on how technology can create a real social impact.',
      'A masterclass in public speaking, presence, and impactful storytelling.'
    ]
  },
  {
    id: 'college-events',
    title: 'COLLEGE EVENTS',
    category: 'Campus Life',
    description: 'Participated in various university events, competitions, workshops, and cultural activities that contributed to teamwork, leadership, and networking skills.',
    date: '2024 - 2025',
    location: 'University Campus',
    coverImage: college1,
    images: [college1, college2, college3, college4],
    narrative: 'Beyond academics, active involvement in college fests, cultural hackathons, and technical clubs played a massive role in shaping my communication skills. Leading event coordination, managing logistics, and collaborating across committees taught me invaluable lessons in management, empathy, and practical execution. These events offered a perfect playground to apply soft skills in real-time.',
    takeaways: ['Teamwork', 'Cultural Engagement', 'Event Management', 'Public Relations'],
    highlights: [
      'Coordinated and managed logistics for events hosting over 500+ attendees.',
      'Participated in multiple inter-college tech trivia and cultural challenges.',
      'Refined interpersonal and leadership skills in diverse multi-functional teams.'
    ],
    quotes: [
      'Active campus participation is where leadership skills are truly tested.',
      'Creating memories with peers that define the university experience.'
    ]
  },
  {
    id: 'tech-events',
    title: 'TECH EVENTS',
    category: 'Industry Summit',
    description: 'Attended technical seminars, workshops, networking sessions, and developer communities to stay updated with industry trends and emerging technologies.',
    date: 'Ongoing',
    location: 'Tech Hubs & Meetups',
    coverImage: tech1,
    images: [tech1],
    narrative: 'Participating in developer communities, tech summits, and local meetups keeps me connected with the latest shifts in technology. Attending panels on cloud computing, system design, and AI tooling has helped me align my personal learning with actual production demands in the industry, while forming connections with senior mentors and peers alike.',
    takeaways: ['Emerging Tech', 'System Design', 'Industry Standards', 'Peer Networking'],
    highlights: [
      'Engaged with local developer groups and participated in active discussions.',
      'Attended talks on distributed databases, system architecture, and cloud deployment.',
      'Exchanged feedback and ideas with industry developers on open-source projects.'
    ],
    quotes: [
      'Staying curious and connected with the developer community is key to growth.',
      'The energy of tech meetups drives me to keep building and experimenting.'
    ]
  }
];
