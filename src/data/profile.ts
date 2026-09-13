import { ProfileData, ExploringFocus } from '@/types';

export const profileData: ProfileData = {
  name: 'SRIDHARSHINI S',
  role: 'Computer Science and Engineering Student',
  specialization: 'Cyber Security & Artificial Intelligence Systems',
  institution: 'Chennai Institute of Technology',
  cgpa: '9.07 CGPA',
  tagline: 'Exploring technology through curiosity and problem-solving.',
  bio: 'I am a Computer Science and Engineering student specializing in Cyber Security, with interests spanning cybersecurity, networking, artificial intelligence, and software development. I enjoy exploring complex technical problems and building practical systems that combine research, engineering, and real-world impact.',
  socials: {
    linkedin: 'https://www.linkedin.com/in/sridharshini-s/',
    github: 'https://github.com/Sridharshini-Crypto',
    email: 'ssridharshiniofficial@gmail.com',
    whatsappNumber: '919488363352',
    whatsappFormatted: '+91 94883 63352',
  },
  defaultWhatsAppMessage: 'Hi Sridharshini, I explored your portfolio and would like to connect with you regarding an opportunity or technical collaboration.',
};

export const exploringFocusAreas: ExploringFocus[] = [
  {
    id: 'cybersecurity-systems',
    title: 'Cybersecurity Systems',
    domain: 'Cybersecurity',
    status: 'Active Focus',
    description: 'Investigating defense-in-depth, zero-trust architectures, vulnerability analysis, and security telemetry correlation.',
    targetObjective: 'Building resilient security frameworks and air-gapped system prototypes.',
  },
  {
    id: 'network-security',
    title: 'Network Security',
    domain: 'Networking',
    status: 'Active Focus',
    description: 'Analyzing packet routing protocols, avionics communication buses, switch topologies, and secure network boundaries.',
    targetObjective: 'Designing deterministic communication pipelines and protocol verification.',
  },
  {
    id: 'ai-systems',
    title: 'Artificial Intelligence',
    domain: 'Artificial Intelligence',
    status: 'Active Focus',
    description: 'Exploring physics-informed machine learning, local language model workflows, and predictive analytics for real-world domains.',
    targetObjective: 'Developing interpretable AI models for aerospace health monitoring and compliance.',
  },
  {
    id: 'research-engineering',
    title: 'Research-Driven Engineering',
    domain: 'Engineering',
    status: 'Active Focus',
    description: 'Translating research methodologies, thermodynamic simulations, and algorithmic concepts into functional software systems.',
    targetObjective: 'Bridging empirical analysis with maintainable software engineering.',
  },
  {
    id: 'practical-systems',
    title: 'Practical System Development',
    domain: 'Software Development',
    status: 'Active Focus',
    description: 'Engineering end-to-end full-stack applications with robust APIs, responsive interfaces, and automated workflows.',
    targetObjective: 'Creating reliable, production-grade tools for competitions and organizations.',
  },
];
