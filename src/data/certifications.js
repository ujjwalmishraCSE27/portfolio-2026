import tcsLogo from '../assets/tcs_logo.png';
import freecodecampLogo from '../assets/freecodecamp.png';
import leetcodeLogo from '../assets/Leet.png';

export const CERTIFICATIONS = [
  {
    id: 'tcs',
    title: 'AI For All',
    issuer: 'Tata Consultancy Services',
    duration: 'Issued: 2025',
    logo: tcsLogo,
    description: 'Completed AI For All certification covering Artificial Intelligence fundamentals, machine learning concepts, responsible AI practices, and real-world AI applications.',
    link: 'https://drive.google.com/file/d/1cWazhNrifYULT7PMh0kpEGt-b-Xc1RxO/view?usp=drive_link',
    topics: ['Artificial Intelligence', 'Machine Learning', 'Responsible AI', 'AI Applications'],
    buttonText: 'Verify Certification'
  },
  {
    id: 'freecodecamp',
    title: 'Responsive Web Design',
    issuer: 'FreeCodeCamp',
    duration: 'Issued: 2024',
    logo: freecodecampLogo,
    description: "Completed FreeCodeCamp's Responsive Web Design certification, covering HTML, CSS, accessibility, mobile-first development, Flexbox, Grid, and modern web design principles.",
    link: 'https://www.freecodecamp.org/certification/fcc1f668c25-b941-4b61-8ecb-2bb3919b46b3/responsive-web-design',
    topics: ['HTML5', 'CSS3', 'Web Accessibility', 'Flexbox & Grid', 'Responsive Layouts'],
    buttonText: 'View Certificate'
  },
  {
    id: 'leetcode',
    title: '300+ Solved Challenges',
    issuer: 'LeetCode Platform',
    duration: 'Continuous',
    logo: leetcodeLogo,
    description: 'Strengthened problem-solving skills by solving 300+ coding challenges across arrays, linked lists, trees, graphs, dynamic programming, greedy algorithms, recursion, and system design fundamentals.',
    link: 'https://leetcode.com/u/ujjwalmishraCse27/',
    topics: ['Data Structures', 'Algorithms', 'Problem Solving', 'System Design'],
    buttonText: 'Visit LeetCode Profile'
  }
];
