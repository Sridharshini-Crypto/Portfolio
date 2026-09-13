import { JourneyMilestone } from '@/types';

export const journeyMilestones: JourneyMilestone[] = [
  // Higher Education: CIT Specialization
  {
    id: 'cit-btech',
    category: 'education',
    categoryLabel: 'Undergraduate Degree',
    title: 'Bachelor of Engineering — CSE (Cyber Security)',
    organization: 'Chennai Institute of Technology',
    location: 'Chennai, India',
    period: '2026 — Present',
    isCurrent: true,
    metric: {
      label: 'Academic Standing',
      value: '9.07 CGPA',
    },
    description:
      'Pursuing an engineering degree specializing in Cyber Security, focusing on cryptology, network architecture, secure software development, and machine learning.',
    details: [
      'Maintaining a top-tier academic record with a 9.07 CGPA.',
      'Active researcher and builder in AI, aerospace digital twins, and security fusion.',
      'Engaged in institutional hackathons, CTF competitions, and technical leadership.',
    ],
    skillsGained: ['Network Security', 'Cryptography', 'Algorithms & Data Structures', 'Computer Architecture', 'AI & ML'],
    featured: true,
  },

  // Higher Secondary Education (12th Grade) - Schooling 2024-2025
  {
    id: 'hsc-12th',
    category: 'education',
    categoryLabel: 'Higher Secondary (12th)',
    title: 'Higher Secondary Examination (Class XII)',
    organization: 'School Education Board',
    location: 'Tamil Nadu, India',
    period: '2024 — 2025',
    metric: {
      label: 'Academic Score',
      value: '97%',
    },
    description:
      'Graduated Higher Secondary education with 97% aggregate, demonstrating academic excellence in Mathematics, Physics, Chemistry, and Computer Science.',
    details: [
      'Achieved a 97% aggregate score with distinction across core science and mathematics.',
      'Developed strong algorithmic logic and analytical problem-solving foundation.',
    ],
    skillsGained: ['Mathematics', 'Physics & Analytical Reasoning', 'Computer Science Fundamentals', 'Problem Solving'],
    featured: true,
  },

  // Secondary School Education (10th Grade) - Schooling 2022-2023
  {
    id: 'sslc-10th',
    category: 'education',
    categoryLabel: 'Secondary School (10th)',
    title: 'Secondary School Leaving Certificate (Class X)',
    organization: 'School Education Board',
    location: 'Tamil Nadu, India',
    period: '2022 — 2023',
    metric: {
      label: 'Academic Score',
      value: '95%',
    },
    description:
      'Completed secondary education with 95% aggregate distinction, establishing foundational mathematical reasoning and strategic aptitude.',
    details: [
      'Secured 95% aggregate distinction in secondary school board examinations.',
      'Active participant in science forums, student leadership, and chess championships.',
    ],
    skillsGained: ['Foundational Mathematics', 'Scientific Inquiry', 'Strategic Thinking'],
    featured: true,
  },

  // Aerospace & Defense Milestone (2026)
  {
    id: 'hal-aerothon',
    category: 'achievement',
    categoryLabel: 'Aerospace Defense Milestone',
    title: 'Top 25 Finalist — HAL × IIT Indore Aerothon 2026',
    organization: 'Hindustan Aeronautics Limited (HAL) & IIT Indore',
    location: 'National Competition',
    period: '2026',
    metric: {
      label: 'Nationwide Standing',
      value: 'Top 25 of 2,300+',
    },
    description:
      'Selected among the top 25 engineering teams in India for developing SubAero — a Physics-Informed Digital Twin for four-stage turbojet health monitoring and RUL forecasting.',
    details: [
      'Engineered thermodynamic physics models integrated with neural networks.',
      'Validated telemetry streaming on simulated CAN Bus and ARINC-429 protocols.',
      'Presented live digital twin telemetry HUD to senior HAL defense scientists and IIT faculty.',
    ],
    skillsGained: ['Physics-Informed ML', 'Digital Twin Architecture', 'Turbomachinery Thermodynamics', 'Defense Systems'],
    relatedProjectIds: ['subaero'],
    featured: true,
  },

  // Experience (2026)
  {
    id: 'baeonn-internship',
    category: 'experience',
    categoryLabel: 'Industry Experience',
    title: 'Full Stack Developer Intern',
    organization: 'BAEONN',
    location: 'Singapore (Virtual)',
    period: '2026',
    description:
      'Contributed as a virtual full stack developer intern, engineering responsive web application interfaces and backend services for production-oriented web systems.',
    details: [
      'Developed modular, scalable frontend components using React.js and modern styling workflows.',
      'Integrated RESTful API endpoints and optimized data fetching for real-time responsiveness.',
      'Collaborated within an agile international development environment.',
    ],
    skillsGained: ['React.js', 'Node.js', 'REST APIs', 'Full-Stack Architecture', 'Agile Workflows'],
    featured: true,
  },

  // Microsoft Agents League (2026)
  {
    id: 'ms-agents-league',
    category: 'competition',
    categoryLabel: 'AI Challenge Milestone',
    title: 'Reasoning Agents Track Participant',
    organization: 'Microsoft Agents League (Microsoft Foundry)',
    location: 'Global Developer Challenge',
    period: '2026',
    description:
      'Participated in the competitive Reasoning Agents Track focused on building deterministic, autonomous reasoning agents utilizing Microsoft Foundry architectures.',
    details: [
      'Explored multi-step chain-of-thought verification and stateful agent orchestration.',
      'Implemented reasoning loops designed for high-consequence technical workflows.',
    ],
    skillsGained: ['Reasoning Agents', 'Microsoft Foundry', 'Agentic Workflows', 'Deterministic Verification'],
    relatedProjectIds: ['regushield'],
    featured: false,
  },

  // Leadership & Community - Club Asymmetric (2026)
  {
    id: 'club-asymmetric',
    category: 'leadership',
    categoryLabel: 'Technical Leadership',
    title: 'Secretary & Documentation Lead',
    organization: 'Club Asymmetric',
    location: 'Chennai Institute of Technology',
    period: '2025 — Present',
    isCurrent: true,
    description:
      'Serving as the core secretary and documentation lead, driving technical initiatives, hackathon operations, technical writing, and system documentation for the club.',
    details: [
      'Managing structured technical documentation and event post-mortems for technical symposia.',
      'Coordinating development teams building internal club web platforms and portals.',
      'Mentoring junior members on Git, full-stack development, and open-source contributions.',
    ],
    skillsGained: ['Technical Leadership', 'Documentation Engineering', 'Team Coordination', 'Event Execution'],
    featured: true,
  },

  // Leadership & Workshop Instructor (2025 — Present)
  {
    id: 'blockchain-instructor',
    category: 'leadership',
    categoryLabel: 'Technical Mentorship',
    title: 'Workshop Instructor & Technical Event Organizer',
    organization: 'Institutional Technical Events',
    location: 'Chennai Institute of Technology',
    period: '2025 — Present',
    description:
      'Conducted a hands-on Blockchain technology workshop and served as lead organizer for multiple hackathons, coding contests, and technical symposium rounds.',
    details: [
      'Delivered interactive technical sessions on blockchain fundamentals, smart contract architecture, and cryptographic hashing.',
      'Organized multi-track technical competitions reaching hundreds of student developers.',
      'Designed competition rubrics and oversaw automated evaluation pipelines.',
    ],
    skillsGained: ['Public Speaking', 'Technical Instruction', 'Event Production', 'Blockchain Systems'],
    featured: false,
  },

  // National Hackathons (2026)
  {
    id: 'national-hackathons',
    category: 'achievement',
    categoryLabel: 'Hackathon Track Record',
    title: 'National-Level Hackathon Finalist',
    organization: 'Multiple Premier Institutions',
    location: 'All-India Hackathons',
    period: '2026',
    description:
      'Consistently qualified as a finalist in national-level hackathons by architecting rapid prototypes across AI, cybersecurity defense, and full-stack web applications.',
    details: [
      'Built and pitched high-impact prototypes within 24-48 hour hackathon sprints.',
      'Demonstrated expertise in rapid systems integration, API orchestration, and live pitching.',
    ],
    skillsGained: ['Rapid Prototyping', 'System Architecture', 'High-Pressure Delivery', 'Technical Pitching'],
    featured: false,
  },

  // Capture The Flag (CTF) (2026)
  {
    id: 'ctf-experience',
    category: 'competition',
    categoryLabel: 'Cybersecurity Arena',
    title: 'Active Capture The Flag (CTF) Competitor',
    organization: 'Cybersecurity Arena & National CTFs',
    location: 'Online / National Events',
    period: '2026 — Present',
    isCurrent: true,
    description:
      'Actively solving security challenges across web exploitation, cryptography, network packet forensics, and reverse engineering.',
    details: [
      'Applying practical defensive and offensive security concepts to dissect vulnerabilities.',
      'Analyzing Wireshark packet captures, cipher transformations, and authentication flaws.',
    ],
    skillsGained: ['Network Forensics', 'Web Security', 'Cryptographic Analysis', 'Vulnerability Assessment'],
    relatedProjectIds: ['sentinelx'],
    featured: false,
  },

  // District Chess (Strategic Foundation)
  {
    id: 'chess-achievement',
    category: 'achievement',
    categoryLabel: 'Strategic Foundation',
    title: 'District-Level Chess Player',
    organization: 'District Chess Association',
    location: 'District Level',
    period: 'Foundational Milestone',
    description:
      'Represented school at the district chess level, cultivating a deep foundation of forward calculation, pattern recognition, patience, and rigorous analytical thinking.',
    details: [
      'Developed sharp strategic planning, dynamic risk evaluation, and positional assessment.',
      'Transferred chess principles of multi-move foresight directly into complex software architecture and threat modeling.',
    ],
    skillsGained: ['Strategic Foresight', 'Pattern Recognition', 'Decision Making Under Pressure', 'Analytical Logic'],
    featured: false,
  },
];
