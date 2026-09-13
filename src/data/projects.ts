import { Project } from '@/types';

export const projectsData: Project[] = [
  {
    id: 'subaero',
    number: '01',
    title: 'SubAero',
    tagline: 'Physics-Informed Digital Twin for Turbojet Diagnostics & RUL Forecasting',
    category: 'Artificial Intelligence / Digital Twin / Aerospace',
    domain: 'Aerospace AI / Digital Twin',
    status: 'HAL Aerothon Top 25 Finalist',
    year: '2026',
    featured: true,
    imagePath: '/projects/subaero.png',
    githubUrl: 'https://github.com/Sridharshini-Crypto/SubAero.git',
    metrics: [
      { label: 'Competition Standing', value: 'Top 25 Finalist' },
      { label: 'Evaluation Pool', value: '2,300+ Teams' },
      { label: 'Architecture Model', value: '4-Stage Turbojet' },
      { label: 'Diagnostic Method', value: 'Physics-Informed ML' },
    ],
    overview:
      'Physics-informed digital twin engineered for the HAL × IIT Indore Aerothon 2026. Fuses Brayton cycle thermodynamic equations with neural networks for real-time turbojet degradation tracking, anomaly detection, and Remaining Useful Life (RUL) forecasting.',
    problem:
      'Black-box neural networks produce unphysical predictions under severe aerodynamic edge cases, while standard analytical solvers are too slow for real-time avionics telemetry.',
    approach:
      'Formulated a Physics-Informed Machine Learning (PIML) pipeline embedding Brayton thermodynamic loss constraints into PyTorch models, tracking health across compressor, combustor, and turbine stages.',
    architecture: {
      summary:
        'Bi-directional telemetry pipeline coupling avionics streaming with thermodynamic ODE solvers and explainable neural diagnostics.',
      flow: [
        'Avionics Bus Ingestion (CAN Bus / ARINC-429 telemetry)',
        'Thermodynamic State Validation (Brayton Cycle Invariants)',
        'Physics-Constrained Neural Network for Health Degradation',
        'Weibull Reliability Curve & RUL Remaining Life Forecast',
        'Interactive 3D Cutaway & Anomaly Isolation HUD',
      ],
      nodes: [
        {
          id: 'sensor-bus',
          label: 'Avionics Telemetry Bus',
          role: 'Telemetry stream ingestion',
          tech: 'CAN Bus / ARINC-429',
        },
        {
          id: 'physics-core',
          label: 'Thermodynamics Solver',
          role: 'Brayton cycle state validation',
          tech: 'NumPy / SciPy ODEs',
        },
        {
          id: 'pim-engine',
          label: 'Physics-Informed ML',
          role: 'White-box health estimation & thrust prediction',
          tech: 'PyTorch / PINN',
        },
        {
          id: 'rul-forecaster',
          label: 'RUL Weibull Model',
          role: 'Remaining useful life failure trajectory',
          tech: 'Scikit-Learn / Reliability',
        },
        {
          id: 'twin-ui',
          label: 'AeroTwin Mission Control',
          role: 'Real-time telemetry HUD & 3D visualization',
          tech: 'Three.js / React / Next.js',
        },
      ],
    },
    techStack: [
      {
        category: 'Core AI & Mathematics',
        items: ['Python', 'PyTorch', 'PINNs', 'Thermodynamic Modeling', 'Weibull Analysis'],
      },
      {
        category: 'Telemetry & Avionics',
        items: ['CAN Bus', 'ARINC-429', 'Stream Processing', 'NumPy / SciPy'],
      },
      {
        category: 'Interface & 3D CAD',
        items: ['Three.js', 'React.js', 'Tailwind CSS', 'Mission Control HUD'],
      },
    ],
    keyCapabilities: [
      'Physics-informed thermodynamic loss constraints preventing unphysical estimations.',
      'Stage-by-stage component health tracking for compressor, combustor, and turbine.',
      'Remaining Useful Life (RUL) failure trajectory modeling via Weibull analysis.',
      'Interactive 3D turbojet mesh cutaway with thermal gradient inspection.',
      'Simulated avionics telemetry stream integration.',
    ],
    outcome:
      'Ranked Top 25 Finalist out of 2,300+ national teams at the HAL × IIT Indore Aerothon 2026 for physical fidelity and real-time inference speed.',
  },
  {
    id: 'regushield',
    number: '02',
    title: 'ReguShield',
    tagline: 'Air-Gapped AI Regulatory Compliance & Deterministic Verification Platform',
    category: 'Artificial Intelligence / Compliance Technology',
    domain: 'Air-Gapped AI / Zero-Trust Compliance',
    status: 'Team ZeroTrustUs / Active',
    year: '2026',
    featured: true,
    imagePath: '/projects/regushield.png',
    githubUrl: 'https://github.com/Sridharshini-Crypto/RegushieldAI-ZeroTrustUs.git',
    metrics: [
      { label: 'Security Model', value: 'Air-Gapped Zero-Trust' },
      { label: 'Reasoning Engine', value: 'LangGraph Local Workflow' },
      { label: 'Validation Type', value: 'Deterministic Rules' },
      { label: 'Data Egress', value: 'Zero External Cloud' },
    ],
    overview:
      'Air-gapped AI compliance platform developed by Team ZeroTrustUs for banking enclaves. Combines local open-weight models, LangGraph stateful DAG orchestration, and deterministic rule validation to audit regulatory circulars with zero external cloud egress.',
    problem:
      'Financial institutions cannot send confidential policy specifications to third-party cloud APIs, while generic LLMs hallucinate compliance clauses.',
    approach:
      'Engineered an offline compliance pipeline where local LLMs execute within deterministic LangGraph validation loops, verifying extracted directives against formal Pydantic schema invariants.',
    architecture: {
      summary:
        'Zero-trust local ingestion pipeline parsing regulatory text, executing offline semantic retrieval, and generating deterministic compliance audit matrices.',
      flow: [
        'Secure Air-Gapped PDF Payload Ingestion',
        'Offline Embedding & Chunking (Local Vector Store)',
        'LangGraph Stateful Regulatory Parsing Engine',
        'Deterministic Rule Verification & Constraint Solver',
        'Air-Gapped Audit Ledger & Verification Report',
      ],
      nodes: [
        {
          id: 'payload-ingest',
          label: 'Air-Gapped Ingestion',
          role: 'Offline circular & policy parsing',
          tech: 'PyPDF / Unstructured',
        },
        {
          id: 'local-rag',
          label: 'Local Vector Store',
          role: 'Zero-cloud semantic retrieval',
          tech: 'FAISS / Local Vector DB',
        },
        {
          id: 'langgraph-core',
          label: 'LangGraph Reasoning',
          role: 'Stateful multi-step compliance evaluation',
          tech: 'LangGraph / Local Models',
        },
        {
          id: 'rule-verifier',
          label: 'Deterministic Engine',
          role: 'Strict rule-based constraint validation',
          tech: 'Pydantic / Rule Solver',
        },
        {
          id: 'compliance-ui',
          label: 'Audit Terminal',
          role: 'Visual case review & compliance ledger',
          tech: 'Next.js / Tailwind CSS',
        },
      ],
    },
    techStack: [
      {
        category: 'AI & Agentic Framework',
        items: ['Python', 'LangGraph', 'Local Open-Weights Models', 'FAISS Local RAG'],
      },
      {
        category: 'Security & Validation',
        items: ['Air-Gapped Architecture', 'Deterministic Schema Verification', 'Pydantic', 'Zero-Trust'],
      },
      {
        category: 'Frontend & Terminal',
        items: ['Next.js', 'React', 'Tailwind CSS', 'Dark Terminal UI', 'PDF Viewer'],
      },
    ],
    keyCapabilities: [
      '100% offline air-gapped execution ensuring absolute data privacy.',
      'LangGraph multi-step regulatory extraction with state validation cycles.',
      'Deterministic rule mapping that verifies compliance against formal schemas.',
      'Automated compliance matrix comparing central bank circulars against IT configurations.',
      'Structured multi-page document parsing and clause extraction.',
    ],
    outcome:
      'Engineered an air-gapped compliance enclave capable of evaluating banking directives locally with guaranteed confidentiality and verifiable audit trails.',
  },
  {
    id: 'sentinelx',
    number: '03',
    title: 'SentinelX',
    tagline: 'AI Cyber Fusion Command Center & Multi-Vector Threat Correlation Platform',
    category: 'Cybersecurity / Artificial Intelligence',
    domain: 'Cyber Fusion / Threat Intelligence',
    status: 'Active Repository',
    year: '2026',
    featured: true,
    imagePath: '/projects/sentinelx.png',
    githubUrl: 'https://github.com/Sridharshini-Crypto/SentinelX.git',
    metrics: [
      { label: 'Platform Focus', value: 'Cyber Fusion' },
      { label: 'Threat Framework', value: 'MITRE ATT&CK Matrix' },
      { label: 'Correlation Type', value: 'Multi-Vector Fusion' },
      { label: 'Architecture', value: 'Real-Time Telemetry' },
    ],
    overview:
      'AI Cyber Fusion Command Center unifying threat telemetry across endpoints, network traffic, and banking transactions to correlate sophisticated multi-stage cyber attacks and financial fraud.',
    problem:
      'Security operations suffer from alert fatigue when treating network anomalies and transactional fraud in isolated silos, leaving coordinated attacks undetected.',
    approach:
      'Built a multi-vector event stream correlation engine that classifies indicators against the MITRE ATT&CK matrix and uses behavioral baselines to accelerate SOC triage.',
    architecture: {
      summary:
        'Event-driven cyber fusion pipeline integrating real-time telemetry streaming, MITRE ATT&CK classification, behavioral anomaly scoring, and automated alert triage.',
      flow: [
        'Multi-Vector Telemetry Streaming (Network & Transaction Events)',
        'MITRE ATT&CK Classifier (TTP Mapping & Kill Chain Analysis)',
        'Behavioral Anomaly Scorer & Threat Velocity Analysis',
        'Global Threat Level Indexer & AI Triage Dispatcher',
        'Executive Command HUD & IOC Defense Review',
      ],
      nodes: [
        {
          id: 'event-stream',
          label: 'Telemetry Streamer',
          role: 'Event ingestion pipeline',
          tech: 'WebSocket / Event Streaming',
        },
        {
          id: 'mitre-engine',
          label: 'MITRE ATT&CK Matrix',
          role: 'TTP classification & attack chain mapping',
          tech: 'Python / Vector Embeddings',
        },
        {
          id: 'behavior-twin',
          label: 'Behavioral Analysis',
          role: 'User & entity behavior analytics (UEBA)',
          tech: 'Scikit-Learn / Anomaly Detection',
        },
        {
          id: 'threat-fusion',
          label: 'Correlation Hub',
          role: 'Cross-domain fraud & threat synthesis',
          tech: 'Graph Analytics / Network Analysis',
        },
        {
          id: 'fusion-ui',
          label: 'Cyber Command HUD',
          role: 'Real-time telemetry HUD & threat velocity curve',
          tech: 'React / Charting / Tailwind',
        },
      ],
    },
    techStack: [
      {
        category: 'Cyber Intelligence & Analytics',
        items: ['Python', 'MITRE ATT&CK Framework', 'Anomaly Detection', 'Threat Scoring'],
      },
      {
        category: 'Backend & Telemetry',
        items: ['FastAPI', 'Node.js', 'WebSocket Streaming', 'Event Processing'],
      },
      {
        category: 'Visualization & UX',
        items: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Interactive Threat Matrix'],
      },
    ],
    keyCapabilities: [
      'Multi-vector correlation linking network intrusions with transaction fraud triggers.',
      'MITRE ATT&CK matrix mapping across Defense Evasion, Credential Access, and Discovery.',
      'Threat Velocity timeline visualizing attack burst trajectories in real time.',
      'Structured incident triage queue with automated IOC investigation.',
      'Executive summary generator translating technical telemetry into threat briefings.',
    ],
    outcome:
      'Engineered a single-pane cyber fusion dashboard that synthesizes fragmented security logs into cohesive attack narratives for defensive operations.',
  },
  {
    id: 'finsight',
    number: '04',
    title: 'FinSight',
    tagline: 'AI-Driven Lending Command Center & Transaction Intelligence Platform',
    category: 'Artificial Intelligence / Financial Analytics',
    domain: 'FinTech AI / Banking Intelligence',
    status: 'Active Repository',
    year: '2026',
    featured: true,
    imagePath: '/projects/finsight.png',
    githubUrl: 'https://github.com/Sridharshini-Crypto/Finsight.git',
    metrics: [
      { label: 'Platform Role', value: 'Lending Command Center' },
      { label: 'Analytics Model', value: 'Readiness & Intent Index' },
      { label: 'Workflow', value: 'Next-Best-Action Engine' },
      { label: 'Interface', value: 'Customer 360 Dashboard' },
    ],
    overview:
      'AI financial intelligence and lending command center that evaluates customer transaction signals, predicts lending readiness, and prioritizes relationship manager outreach workflows.',
    problem:
      'Relationship managers navigate fragmented account ledgers across siloed banking tools, delaying timely loan origination and risk identification.',
    approach:
      'Synthesized portfolio updates, transaction flows, and credit indicators into an AI briefing portal that computes an explainable Lending Readiness Index and next-best actions.',
    architecture: {
      summary:
        'Unified financial analytics pipeline converting ledger streams and credit behavior into prioritized relationship workflows.',
      flow: [
        'Banking Transaction & Workflow Feed Ingestion',
        'Customer 360 Behavioral Feature Extraction',
        'Predictive Intent & Lending Readiness Index Scoring',
        'Automated Action Recommender & Underwriting Intelligence',
        'Interactive Relationship Manager Command Center UI',
      ],
      nodes: [
        {
          id: 'tx-ingest',
          label: 'Transaction Feed',
          role: 'Ledger stream ingestion',
          tech: 'Node.js / Express / SQL',
        },
        {
          id: 'customer-360',
          label: 'Customer 360 Profiler',
          role: 'Behavioral pattern & balance analysis',
          tech: 'Python / Pandas',
        },
        {
          id: 'scoring-engine',
          label: 'Readiness & Risk Model',
          role: 'Lending propensity & risk scoring',
          tech: 'Scikit-Learn / Predictive Models',
        },
        {
          id: 'nba-engine',
          label: 'Next-Best-Action AI',
          role: 'Action recommendation generator',
          tech: 'Rule Engine / LLM Assist',
        },
        {
          id: 'bank-ui',
          label: 'Lending Command Hub',
          role: 'Opportunity Hub & prioritized work queue',
          tech: 'React / Next.js / Tailwind CSS',
        },
      ],
    },
    techStack: [
      {
        category: 'Data & Machine Learning',
        items: ['Python', 'Pandas', 'Scikit-Learn', 'Financial Modeling', 'Risk Profiling'],
      },
      {
        category: 'Full-Stack Architecture',
        items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'SQL'],
      },
      {
        category: 'UI / UX Design',
        items: ['Tailwind CSS', 'Command Palette (Cmd+K)', 'Responsive KPI Cards'],
      },
    ],
    keyCapabilities: [
      'Lending Command Center displaying real-time portfolio opportunities and follow-up queues.',
      'Daily AI Briefing summarizing customer financial signals and next actions.',
      'Transparent scoring rationale detailing underlying account indicators.',
      'Customer 360 view aggregating financial behavior, requests, and pre-approved offers.',
      'Fast command shortcuts for accelerated portfolio navigation.',
    ],
    outcome:
      'Developed a functional banking intelligence portal delivering portfolio visibility and transparent next-best-action guidance for loan officers.',
  },
];
