import { NetworkDomain, TechItem } from '@/types';

export const allTechnologies: TechItem[] = [
  // Programming
  { name: 'Python', category: 'Programming', description: 'Core language for AI/ML, data processing, security scripts, and PINN modeling.' },
  { name: 'C++', category: 'Programming', description: 'High-performance algorithms, system programming, and competitive problem solving.' },
  { name: 'C', category: 'Programming', description: 'Embedded systems, memory management, and low-level firmware engineering.' },
  { name: 'SQL', category: 'Programming', description: 'Relational database querying, schema design, and financial transaction analysis.' },
  { name: 'JavaScript', category: 'Programming', description: 'Interactive frontend interfaces, asynchronous event streaming, and full-stack logic.' },
  { name: 'Java', category: 'Programming', description: 'Object-oriented programming, enterprise structures, and backend services.' },

  // Development
  { name: 'React.js', category: 'Development', description: 'Component-driven interactive UIs, mission control dashboards, and real-time state.' },
  { name: 'Node.js', category: 'Development', description: 'Event-driven server runtimes, REST APIs, and high-concurrency WebSocket hubs.' },
  { name: 'Express.js', category: 'Development', description: 'Robust HTTP routing, middleware authentication, and backend microservices.' },
  { name: 'HTML5', category: 'Development', description: 'Semantic, accessible, and structured web foundation.' },
  { name: 'CSS3 / Tailwind', category: 'Development', description: 'Modern responsive styling, custom design systems, and fluid layouts.' },

  // Development Tools
  { name: 'Git', category: 'Development Tools', description: 'Distributed version control, branching workflows, and collaborative development.' },
  { name: 'GitHub', category: 'Development Tools', description: 'Code hosting, CI/CD actions, open-source repositories, and team code review.' },

  // Cybersecurity & Technical Areas
  { name: 'Cybersecurity', category: 'Cybersecurity & Technical Areas', description: 'Threat modeling, zero-trust architecture, vulnerability analysis, and defense fusion.' },
  { name: 'Networking', category: 'Cybersecurity & Technical Areas', description: 'TCP/IP protocols, CAN Bus, ARINC-429, packet inspection, and network topologies.' },
  { name: 'Capture The Flag (CTF)', category: 'Cybersecurity & Technical Areas', description: 'Practical security challenges in cryptography, reverse engineering, web security, and forensics.' },
  { name: 'Problem Solving', category: 'Cybersecurity & Technical Areas', description: 'Algorithmic efficiency, strategic logic, chess analytical thinking, and complex debugging.' },
];

export const networkDomains: NetworkDomain[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    code: 'SEC-01',
    tagline: 'Zero-Trust Architecture & Threat Fusion',
    description:
      'Focusing on defense-in-depth, threat intelligence fusion, air-gapped compliance, vulnerability analysis, and behavioral anomaly detection across modern enterprise infrastructure.',
    technologies: [
      { name: 'Zero-Trust Architecture', category: 'Cybersecurity & Technical Areas' },
      { name: 'MITRE ATT&CK Mapping', category: 'Cybersecurity & Technical Areas' },
      { name: 'Capture The Flag (CTF)', category: 'Cybersecurity & Technical Areas' },
      { name: 'Air-Gapped Systems', category: 'Cybersecurity & Technical Areas' },
      { name: 'Python (SecOps)', category: 'Programming' },
      { name: 'C / C++', category: 'Programming' },
    ],
    connectedProjectIds: ['sentinelx', 'regushield'],
    connections: ['networking', 'ai', 'software-dev'],
    keyCapabilities: [
      'Multi-vector threat telemetry correlation',
      'Air-gapped regulatory compliance reasoning',
      'Defensive event triage and IOC investigation',
      'Cryptographic concepts and security baseline verification',
    ],
  },
  {
    id: 'networking',
    name: 'Networking',
    code: 'NET-02',
    tagline: 'Protocols, Packet Routing & Avionics Telemetry',
    description:
      'Designing and analyzing deterministic communication pipelines, avionics buses (CAN Bus, ARINC-429), and enterprise network topologies.',
    technologies: [
      { name: 'Cisco Packet Tracer', category: 'Cybersecurity & Technical Areas' },
      { name: 'CAN Bus Protocol', category: 'Cybersecurity & Technical Areas' },
      { name: 'ARINC-429 Telemetry', category: 'Cybersecurity & Technical Areas' },
      { name: 'TCP/IP & OSI Stack', category: 'Cybersecurity & Technical Areas' },
      { name: 'WebSocket Streaming', category: 'Development' },
    ],
    connectedProjectIds: ['subaero', 'sentinelx'],
    connections: ['cybersecurity', 'ai'],
    keyCapabilities: [
      'Avionics signal stream ingestion and processing',
      'Subnetting, packet routing, and firewall rule design',
      'Bi-directional real-time WebSocket state distribution',
    ],
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    code: 'AI-03',
    tagline: 'Physics-Informed ML, RAG & Agentic Workflows',
    description:
      'Developing AI systems that merge machine learning with physics constraints, local LLM orchestration (LangGraph), and predictive analytics for turbomachinery and finance.',
    technologies: [
      { name: 'Python', category: 'Programming' },
      { name: 'PyTorch / PINNs', category: 'Programming' },
      { name: 'LangGraph & Local LLMs', category: 'Cybersecurity & Technical Areas' },
      { name: 'RAG / Vector Databases', category: 'Development Tools' },
      { name: 'Scikit-Learn / Predictive Models', category: 'Programming' },
      { name: 'Pandas / NumPy', category: 'Programming' },
    ],
    connectedProjectIds: ['subaero', 'regushield', 'finsight'],
    connections: ['cybersecurity', 'software-dev', 'problem-solving'],
    keyCapabilities: [
      'Physics-informed thermodynamic digital twin modeling',
      'Stateful multi-agent compliance workflows with LangGraph',
      'Lending readiness index and customer intent analytics',
      'Remaining Useful Life (RUL) Weibull degradation estimation',
    ],
  },
  {
    id: 'software-dev',
    name: 'Software Development',
    code: 'DEV-04',
    tagline: 'Full-Stack Systems & Clean Engineering',
    description:
      'Engineering production-ready web applications, microservices, and interactive developer tooling with a focus on maintainable architectures, type safety, and intuitive UX.',
    technologies: [
      { name: 'React.js', category: 'Development' },
      { name: 'Node.js', category: 'Development' },
      { name: 'Express.js', category: 'Development' },
      { name: 'JavaScript / TypeScript', category: 'Programming' },
      { name: 'SQL / Databases', category: 'Programming' },
      { name: 'Git / GitHub', category: 'Development Tools' },
    ],
    connectedProjectIds: ['finsight'],
    connections: ['cybersecurity', 'ai', 'problem-solving'],
    keyCapabilities: [
      'Component-driven interactive dashboard architecture',
      'REST API design & modular backend services',
      'Relational database modeling and query optimization',
    ],
  },
  {
    id: 'problem-solving',
    name: 'Problem Solving',
    code: 'ALG-05',
    tagline: 'Algorithmic Rigor & Strategic Reasoning',
    description:
      'Applying structured mathematical reasoning, data structures & algorithms in C++/Python, and strategic foresight gained from competitive chess and hackathons.',
    technologies: [
      { name: 'C++', category: 'Programming' },
      { name: 'Python', category: 'Programming' },
      { name: 'Data Structures & Algorithms', category: 'Programming' },
      { name: 'Strategic Chess Analysis', category: 'Cybersecurity & Technical Areas' },
      { name: 'Hackathon Rapid Prototyping', category: 'Development Tools' },
    ],
    connectedProjectIds: ['subaero'],
    connections: ['ai', 'software-dev', 'cybersecurity'],
    keyCapabilities: [
      'Optimization algorithms under resource constraints',
      'Strategic risk-benefit evaluation and multi-step planning',
      'Competitive hackathon rapid architecture execution',
    ],
  },
];
