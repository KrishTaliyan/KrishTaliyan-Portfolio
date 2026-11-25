// All portfolio content lives here, so updating the site means editing this one file.
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Krish Taliyan',
  firstName: 'Krish',
  roles: ['Full-Stack Developer', 'MERN Stack Engineer', 'React Native Builder', 'Problem Solver'],
  tagline:
    'I turn complex problems into elegant, scalable products — from REST APIs and auth systems to pixel-tidy React interfaces and cross-platform mobile apps.',
  photo: `${base}profile.jpg`,
  resume: `${base}Krish_Taliyan_Resume.pdf`,
  email: 'krishtaliyan132@gmail.com',
  phone: '+91 8273260384',
  location: 'Phagwara, Punjab, India',
  github: 'https://github.com/KrishTaliyan',
  linkedin: 'https://www.linkedin.com/in/krish-taliyan/',
}

export const about = [
  "I'm a Full-Stack Developer pursuing a B.Tech in Computer Science and Engineering at Lovely Professional University, holding a CGPA of 8.08.",
  'I love the whole journey of a product: modelling data in MongoDB, designing clean REST APIs with Express, securing them with JWT and role-based access, and shipping fast, responsive interfaces in React and React Native.',
  "Outside of projects I sharpen my problem-solving on LeetCode and HackerRank, and I'm always looking for the next hackathon or open-source repo to dive into.",
]

export const stats = [
  { value: 300, suffix: '+', label: 'DSA problems solved on LeetCode' },
  { value: 5, suffix: '★', label: 'Gold rating in Java on HackerRank' },
  { value: 8.08, suffix: '', label: 'CGPA at LPU', decimals: 2 },
  { value: 6, suffix: '', label: 'Projects shipped & deployed' },
]

export const skillGroups = [
  { title: 'Languages', icon: '{ }', items: ['JavaScript', 'Java', 'C++', 'C', 'Python'] },
  { title: 'Frontend', icon: '◧', items: ['React', 'Next.js', 'React Native', 'Tailwind CSS', 'HTML', 'CSS'] },
  { title: 'Backend & Data', icon: '⛁', items: ['Node.js', 'Express.js', 'MongoDB', 'MySQL', 'REST APIs', 'JWT Auth'] },
  { title: 'Tools', icon: '⚙', items: ['Git', 'GitHub', 'VS Code', 'Postman', 'Linux / Ubuntu', 'XAMPP'] },
]

export const timeline = [
  {
    when: "Jul '25",
    kind: 'Training',
    title: 'MERN Stack Development',
    org: 'Cipher Schools (EdTech)',
    points: [
      'Extended full-stack apps with MongoDB, Express.js, React and Node.js — faster backend/frontend integration and ~30% quicker feature delivery.',
      'Built CRUD flows, REST APIs and component-based UIs, improving scalability and response efficiency by ~25%.',
      'Hands-on with authentication, routing and state management — a ~35% lift in overall project functionality.',
    ],
  },
  {
    when: "Aug '23 — Present",
    kind: 'Education',
    title: 'B.Tech, Computer Science & Engineering',
    org: 'Lovely Professional University · Phagwara, Punjab',
    points: ['Current CGPA: 8.08.'],
  },
  {
    when: "Mar '21 — May '22",
    kind: 'Education',
    title: 'Intermediate (PCM)',
    org: 'J.P. International School · Meerut, Uttar Pradesh',
    points: ['Graduated with 91%.'],
  },
]

export const projects = [
  {
    title: 'NearBitez',
    subtitle: 'Food Ordering App',
    date: "Jun '26",
    category: 'Mobile',
    featured: true,
    accent: ['#f97316', '#ef4444'],
    emoji: '🍔',
    image: `${base}projects/nearbitez.jpg`,
    description:
      'Cross-platform food ordering app in React Native with reusable components and a smooth Android experience. Node/Express REST APIs power auth, restaurant discovery, cart and orders, with JWT, protected routes, persistent login and role-based access for customers and restaurant owners.',
    tags: ['React Native', 'Node.js', 'Express.js', 'MongoDB', 'JWT'],
    live: 'https://near-bitez.vercel.app/',
    code: 'https://github.com/sanjuvemula/NearBytes',
  },
  {
    title: 'Startup-to-Corporate Connect',
    subtitle: 'Partnership Platform',
    date: "Nov '25",
    category: 'Full Stack',
    featured: true,
    accent: ['#34d399', '#0ea5e9'],
    emoji: '🤝',
    image: `${base}projects/startup.jpg`,
    description:
      'A platform where startups and corporates connect and explore partnerships through structured profiles and role-based dashboards. Secured with JWT and middleware-based role access control; responsive React + Tailwind UI wired to the API with Axios.',
    tags: ['MERN', 'JWT Auth', 'RBAC', 'Tailwind CSS', 'Axios'],
    live: 'https://startup-to-corporate-project-fawn.vercel.app/',
    code: 'https://github.com/KrishTaliyan/Startup-to-Corporate-Project',
  },
  {
    title: 'PowerSense AI',
    subtitle: 'Outage Intelligence Dashboard',
    date: "Feb '25",
    category: 'AI',
    featured: true,
    accent: ['#a78bfa', '#ec4899'],
    emoji: '⚡',
    image: `${base}projects/powersense.jpg`,
    description:
      'An AI-powered grid operations dashboard that turns pole signals into a simple response path — spot outages early, dispatch a crew and confirm the repair — with live signals, a network map, incident tracking and a practice lab.',
    tags: ['MERN', 'AI Insights', 'React', 'Tailwind CSS'],
    live: 'https://power-sense-ai-gamma.vercel.app/',
    code: 'https://github.com/KrishTaliyan/PowerSense-AI',
  },
  {
    title: 'Fin-Scout',
    subtitle: 'AI Investment Research',
    category: 'AI',
    accent: ['#22d3ee', '#3b82f6'],
    emoji: '📈',
    image: `${base}projects/finscout.jpg`,
    description:
      'AI-powered investment research desk: enter a company and it turns financial signals, competitive position, news and risks into a clear invest-or-pass verdict.',
    tags: ['AI', 'LangChain', 'Gemini', 'Finance'],
    live: 'https://fin-scout-phi.vercel.app/',
  },
  {
    title: 'Hack-Verge',
    subtitle: 'Hackathon Platform',
    category: 'Full Stack',
    accent: ['#facc15', '#f97316'],
    emoji: '🏁',
    image: `${base}projects/hackverge.jpg`,
    description:
      'HackVerse Pro — one MERN product for organising, managing and judging hackathons, replacing scattered forms, chats and spreadsheets.',
    tags: ['MERN', 'Hackathons', 'Dashboard'],
    live: 'https://hack-verge-nine.vercel.app/',
  },
  {
    title: 'AI Chatbot',
    subtitle: 'Voice AI Assistant',
    category: 'AI',
    accent: ['#6ee7b7', '#a78bfa'],
    emoji: '🤖',
    image: `${base}projects/chatbot.jpg`,
    description: 'Nova — a voice-enabled AI assistant powered by Gemini, with live conversation, selectable voices and text-to-speech.',
    tags: ['AI', 'Gemini', 'Voice', 'TTS'],
    live: 'https://ai-chat-bot-beryl.vercel.app/',
  },
]

export const achievements = [
  {
    title: 'Competitive Programming',
    body: 'I test my problem-solving under pressure on competitive programming platforms and in live hackathons, continuously refining my algorithmic thinking.',
    points: ['300+ DSA problems solved on LeetCode', '5-star (Gold) rating in Java on HackerRank'],
  },
  {
    title: 'Hackathons & Open Source',
    body: 'I enjoy collaborative building — shipping hackathon projects like Hack-Verge and contributing to open-source repositories and public tools.',
    points: ['Hackathon build: Hack-Verge', 'Public projects on GitHub'],
  },
]

export const certifications = [
  {
    issuer: 'Coursera',
    title: 'Software Development',
    body: 'Core software development principles, clean coding practices and modern methodologies.',
    image: `${base}certs/coursera.jpg`,
  },
  {
    issuer: 'CipherSchools',
    title: 'Git and GitHub',
    body: 'Version control, repository management, branching strategies and collaborative workflows.',
    image: `${base}certs/github.jpg`,
  },
  {
    issuer: "AWS × Forage · Dec '24",
    title: 'Solutions Architecture',
    body: 'Designed a simple, scalable and secure hosting architecture in a practical job simulation.',
    image: `${base}certs/aws.jpg`,
  },
]

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certs' },
  { id: 'contact', label: 'Contact' },
]
