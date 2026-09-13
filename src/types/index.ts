export type ProjectCategory =
  | 'Artificial Intelligence / Compliance Technology'
  | 'Artificial Intelligence / Digital Twin / Aerospace'
  | 'Cybersecurity / Artificial Intelligence'
  | 'Artificial Intelligence / Financial Analytics'
  | 'Full-Stack Development / Technical Competitions'
  | 'Cybersecurity'
  | 'Full-Stack Development'
  | 'Hardware & Embedded Systems';

export interface ProjectArchitecture {
  summary: string;
  flow: string[];
  nodes: {
    id: string;
    label: string;
    role: string;
    tech: string;
  }[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  domain: string;
  status: string;
  year: string;
  overview: string;
  problem: string;
  approach: string;
  architecture: ProjectArchitecture;
  techStack: {
    category: string;
    items: string[];
  }[];
  keyCapabilities: string[];
  outcome: string;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  imagePath?: string;
  featured: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export interface TechItem {
  name: string;
  category: 'Programming' | 'Development' | 'Development Tools' | 'Cybersecurity & Technical Areas';
  description?: string;
}

export interface NetworkDomain {
  id: string;
  name: string;
  code: string;
  tagline: string;
  description: string;
  technologies: TechItem[];
  connectedProjectIds: string[];
  connections: string[]; // Connected domain IDs
  keyCapabilities: string[];
}

export interface JourneyMilestone {
  id: string;
  category: 'education' | 'experience' | 'leadership' | 'achievement' | 'competition';
  categoryLabel: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  isCurrent?: boolean;
  metric?: {
    label: string;
    value: string;
  };
  description: string;
  details: string[];
  skillsGained: string[];
  relatedProjectIds?: string[];
  featured?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  instructor?: string;
  recipientName?: string;
  completionDate?: string;
  category: 'cybersecurity' | 'networking' | 'ai' | 'programming' | 'blockchain';
  categoryLabel: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  verificationPortal?: string;
  pdfUrl?: string;
  previewImage?: string;
  description: string;
  skills: string[];
}

export interface ExploringFocus {
  id: string;
  title: string;
  domain: string;
  status: string;
  description: string;
  targetObjective: string;
}

export interface ProfileData {
  name: string;
  role: string;
  specialization: string;
  institution: string;
  cgpa: string;
  tagline: string;
  bio: string;
  socials: {
    linkedin: string;
    github: string;
    email: string;
    whatsappNumber: string;
    whatsappFormatted: string;
  };
  defaultWhatsAppMessage: string;
}

