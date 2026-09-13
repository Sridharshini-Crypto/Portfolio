import { Certification } from '@/types';

export const certificationsData: Certification[] = [
  // 1. Cybersecurity & Industrial Security
  {
    id: 'cisco-industrial-cybersecurity',
    title: 'Industrial Cybersecurity Essentials',
    issuer: 'Chennai Institute of Technology (CIT) / Cisco Networking Academy',
    instructor: 'Senthil Kumar Sidharthan',
    recipientName: 'Sridharshini S',
    completionDate: '30 Jun 2026',
    category: 'cybersecurity',
    categoryLabel: 'Cybersecurity',
    date: '30 Jun 2026',
    credentialId: '83242a93-f112-41ed-8eaa-6bd27fc958ec',
    pdfUrl: '/certificates/cisco-industrial-cybersecurity-essentials.pdf',
    previewImage: '/certificates/cisco-industrial-cybersecurity-essentials.png',
    description:
      'Covers critical infrastructure defense, industrial control system (ICS/SCADA) security architectures, defense-in-depth principles, and operational technology (OT) threat mitigation.',
    skills: ['ICS/SCADA Security', 'Defense-in-Depth', 'Threat Mitigation', 'OT Security', 'Network Security'],
  },

  // 2. Cisco Packet Tracer Networking - Exploring Networking
  {
    id: 'cisco-exploring-packet-tracer',
    title: 'Exploring Networking with Cisco Packet Tracer',
    issuer: 'Chennai Institute of Technology (CIT) / Cisco Networking Academy',
    instructor: 'Senthil Kumar Sidharthan',
    recipientName: 'Sridharshini S',
    completionDate: '28 Jun 2026',
    category: 'networking',
    categoryLabel: 'Networking',
    date: '28 Jun 2026',
    credentialId: '58ef4ab1-b947-4b73-aaeb-2f1cdc25e0d0',
    pdfUrl: '/certificates/cisco-exploring-networking-packet-tracer.pdf',
    previewImage: '/certificates/cisco-exploring-networking-packet-tracer.png',
    description:
      'Practical simulation and modeling of IP subnetting, dynamic packet routing, switch VLAN configuration, router topology design, and protocol verification in Cisco Packet Tracer.',
    skills: ['Cisco Packet Tracer', 'IP Subnetting', 'Routing & Switching', 'VLANs', 'Network Troubleshooting'],
  },

  // 3. Cisco Packet Tracer Networking - Getting Started
  {
    id: 'cisco-getting-started-packet-tracer',
    title: 'Getting Started with Cisco Packet Tracer',
    issuer: 'Chennai Institute of Technology (CIT) / Cisco Networking Academy',
    instructor: 'Senthil Kumar Sidharthan',
    recipientName: 'Sridharshini S',
    completionDate: '28 Jun 2026',
    category: 'networking',
    categoryLabel: 'Networking',
    date: '28 Jun 2026',
    credentialId: '3e6af42b-9967-4800-b6d8-0a796db87468',
    pdfUrl: '/certificates/cisco-getting-started-packet-tracer.pdf',
    previewImage: '/certificates/cisco-getting-started-packet-tracer.png',
    description:
      'Fundamental concepts of network architecture, device interconnection, IoT device simulation, packet tracing, and network environment troubleshooting.',
    skills: ['Packet Tracer Fundamentals', 'Network Topologies', 'IoT Simulation', 'Device Configuration'],
  },

  // 4. Modern Artificial Intelligence
  {
    id: 'modern-ai',
    title: 'Introduction to Modern AI',
    issuer: 'Chennai Institute of Technology (CIT) / Cisco Networking Academy',
    instructor: 'Senthil Kumar Sidharthan',
    recipientName: 'Sridharshini S',
    completionDate: '12 Jun 2026',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    date: '12 Jun 2026',
    credentialId: 'ae86da38-9ffa-4f7a-b8d9-504c9deb3eda',
    pdfUrl: '/certificates/cisco-introduction-to-modern-ai.pdf',
    previewImage: '/certificates/cisco-introduction-to-modern-ai.png',
    description:
      'Core paradigms of modern artificial intelligence, neural networks, foundation models, machine learning lifecycle, and responsible AI system architecture.',
    skills: ['Modern AI', 'Machine Learning', 'Neural Networks', 'AI Ethics & Architecture'],
  },

  // 5. Apply AI: Analyze Customer Reviews
  {
    id: 'find-insights-ai',
    title: 'Apply AI: Analyze Customer Reviews',
    issuer: 'Chennai Institute of Technology (CIT) / Cisco Networking Academy',
    instructor: 'Senthil Kumar Sidharthan',
    recipientName: 'Sridharshini S',
    completionDate: '12 Jun 2026',
    category: 'ai',
    categoryLabel: 'Artificial Intelligence',
    date: '12 Jun 2026',
    credentialId: '7941f5e4-9177-42ab-ad0f-145dd17a3fd7',
    pdfUrl: '/certificates/cisco-apply-ai-analyze-customer-reviews.pdf',
    previewImage: '/certificates/cisco-apply-ai-analyze-customer-reviews.png',
    description:
      'Applied AI methodologies for extracting structured intelligence, sentiment analysis, NLP data classification, and automated pattern discovery from complex datasets.',
    skills: ['AI Insights', 'NLP & Sentiment Analysis', 'Pattern Discovery', 'Data Extraction'],
  },

  // 6. Programming - Python Essentials 1
  {
    id: 'python-essentials-1',
    title: 'Python Essentials 1',
    issuer: 'Python Institute / Cisco Networking Academy',
    instructor: 'Lynn Bloomer (Director, Cisco Networking Academy)',
    recipientName: 'S SRIDHARSHINI CS',
    completionDate: '07 May 2026',
    category: 'programming',
    categoryLabel: 'Programming',
    date: '07 May 2026',
    credentialId: '7b16dfdf-5e72-470e-ad20-4a0712652993',
    pdfUrl: '/certificates/cisco-python-essentials-1.pdf',
    previewImage: '/certificates/cisco-python-essentials-1.png',
    description:
      'Foundational programming concepts in Python including algorithmic control flow, data types, lists, dictionaries, functions, and structured modular design.',
    skills: ['Python Core', 'Data Structures', 'Algorithmic Logic', 'Modular Code Design'],
  },

  // 7. Programming - Python Essentials 2
  {
    id: 'python-essentials-2',
    title: 'Python Essentials 2',
    issuer: 'Python Institute / Cisco Networking Academy',
    instructor: 'Lynn Bloomer (Director, Cisco Networking Academy)',
    recipientName: 'Sridharshini S',
    completionDate: '07 May 2026',
    category: 'programming',
    categoryLabel: 'Programming',
    date: '07 May 2026',
    credentialId: 'c19e0427-3a08-4c9f-84b0-8777ebbe5ffe',
    pdfUrl: '/certificates/cisco-python-essentials-2.pdf',
    previewImage: '/certificates/cisco-python-essentials-2.png',
    description:
      'Advanced Python paradigms encompassing Object-Oriented Programming (OOP), exception handling, string manipulation, file I/O operations, and generators.',
    skills: ['Object-Oriented Programming', 'Exception Architecture', 'File I/O', 'Iterators & Generators'],
  },

  // 8. Blockchain (Cyfrin Updraft)
  {
    id: 'cyfrin-blockchain-basics',
    title: 'Cyfrin Blockchain Basics',
    issuer: 'Cyfrin Updraft',
    instructor: 'Patrick Collins',
    recipientName: 'Sridharshini S',
    completionDate: '2026 Credential',
    category: 'blockchain',
    categoryLabel: 'Blockchain',
    date: '2026 Credential',
    credentialId: 'CYFRIN-BC-08',
    description:
      'Foundational principles of distributed ledgers, cryptographic hashing, consensus mechanisms, peer-to-peer network topologies, and EVM operations.',
    skills: ['Distributed Ledgers', 'Cryptographic Hashing', 'Consensus Protocols', 'EVM Fundamentals'],
  },
  {
    id: 'cyfrin-solidity-smart-contracts',
    title: 'Cyfrin Solidity Smart Contract Development',
    issuer: 'Cyfrin Updraft',
    instructor: 'Patrick Collins',
    recipientName: 'Sridharshini S',
    completionDate: '2026 Credential',
    category: 'blockchain',
    categoryLabel: 'Blockchain',
    date: '2026 Credential',
    credentialId: 'CYFRIN-SOL-09',
    description:
      'Engineering secure decentralized applications, ERC-20/ERC-721 token standards, smart contract testing, gas optimization, and smart contract vulnerability analysis.',
    skills: ['Solidity', 'Smart Contract Security', 'Gas Optimization', 'Web3 Architecture'],
  },
];
