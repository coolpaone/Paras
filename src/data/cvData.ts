import { ProfileData, WorkExperience, SkillItem, LanguageItem } from '../types';

export const profileData: ProfileData = {
  name: 'PARAS NEPALI',
  title: 'Security Guard',
  email: 'nparas2@gmail.com',
  currentLocation: 'Sonapur, UAE',
  permanentLocation: 'Gorkha, Nepal',
  yearsExperience: '5+ Years',
  availability: 'Available for Security & Hospitality Roles in UAE',
  bio: 'Dedicated and vigilant Security Guard with over five years of proven experience in ensuring the safety and security of people and property across prestigious retail, hospitality, and corporate environments in the UAE. Skilled in surveillance, access control, emergency response, and conflict resolution, with additional experience in concierge services and customer support. Recognized for strong observation skills, professionalism, and effective communication, ensuring both security and a positive guest experience. Adept at working under pressure, maintaining accurate documentation, and upholding compliance with safety regulations.',
  avatarCropUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk670vKSYMO0Wqk6yAuBGH7dvJRzYoKGEZ_Mh9DmenkBVlJ3SOCxxMuJZ4RHczmSURQM76M-ucyf1dZqr2wCs1yoWPFOj-9WFSeiPZxwf1_AbbNSQ6hJq2X_hRKZAXmN2H0nVYQ55R5rA3M7BTGfoT0A-ixfINnhZSv3ScnIxaCjhwJk8f2OuxKSTtbQu9DgmzZYUjzMakXOp1IyuB06z_ia6ZjCRniRA4imU1WsQB1AxNBwszCkNyvC84m4Djze3vvA',
  fullCvImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX1RRryIaWN4Cc2WOHMt4eHSiZYH8eQptbzuEI5N85TSElbS5oLURLB2G7OxziKbAgYRDsN3GBwCSzc2EFqXCSHeNIhSbQHSTdowUgzoUBHp_j3wJEq7bqq7RsFSKHw2Yh8t4WjO8a65ak8_ppi8HxyUkLEuM7dZiXF-RGCFFAJTCztsw_-Tu02J93lf06jjX-OS7mfcLhziShP4K9tvQFtlaSOQPkUnOmuuycOz6K8LiDSMfcTJ8xKRBS67xwo6MuIA',
  stats: [
    { label: '5+ Years', sublabel: 'UAE Experience' },
    { label: 'Dual Focus', sublabel: 'Safety & Guest Service' },
    { label: 'Trilingual', sublabel: 'Nepali, English, Hindi' },
  ],
  strategicPillars: [
    {
      title: 'Vigilance & Observation',
      description: 'Exceptional hazard detection, continuous monitoring, and proactive incident deterrence.',
      iconName: 'Eye',
    },
    {
      title: 'Guest Experience First',
      description: 'Seamlessly blending firm protection with courteous concierge services & customer support.',
      iconName: 'ThumbsUp',
    },
    {
      title: 'Strict Legal Compliance',
      description: 'Adherence to safety protocols, UAE regulations, and precise documentation under pressure.',
      iconName: 'ShieldCheck',
    },
  ],
};

export const experiencesData: WorkExperience[] = [
  {
    id: 'exp-berkeley',
    company: 'BERKELEY (UAE)',
    role: 'Security Guard',
    period: '2024 – Present',
    isCurrent: true,
    locationsServed: ['Commercial & Corporate Facilities', 'Residential Properties'],
    responsibilities: [
      'Surveillance and Monitoring',
      'Access Control',
      'Emergency Response',
      'Patrol and Inspection',
      'Communication and Conflict Resolution',
      'Documentation and Legal Compliance',
    ],
    highlights: [
      'Maintaining active CCTV oversight and digital logs for fast situational response',
      'Conducting systematic multi-point foot patrols across premises',
      'Collaborating closely with facility management on protocol enforcement',
    ],
  },
  {
    id: 'exp-citizen',
    company: 'CITIZEN SECURITY SERVICES (UAE)',
    role: 'Security Guard',
    period: '2021 – 2024',
    isCurrent: false,
    locationsServed: ['Dubai Outlet Mall', 'One and Only One Zabeel'],
    responsibilities: [
      'Patrolled assigned areas to detect and prevent possible infractions of the law.',
      'Prevented shoplifting and theft through vigilant observation.',
      'Assisted customers in a professional and friendly manner.',
      'Provided excellent customer service by answering questions and resolving complaints.',
    ],
    highlights: [
      'Stationed in high-traffic premier landmarks including luxury resort One and Only One Zabeel',
      'Safeguarded retail assets, high-value tenant merchandise, and VIP patrons',
      'De-escalated lost-child and emergency crowd situations with calm diplomacy',
    ],
  },
];

export const skillsData: SkillItem[] = [
  {
    id: 'skill-marketing',
    title: 'Marketing Management',
    description: 'Understanding institutional brand integrity, commercial presentation, and high-standard public alignment.',
    iconName: 'PieChart',
    category: 'operational',
  },
  {
    id: 'skill-pr',
    title: 'Public Relations',
    description: 'Diplomatic community engagement, guest liaison, and projecting warmth alongside security presence.',
    iconName: 'Users',
    category: 'interpersonal',
  },
  {
    id: 'skill-teamwork',
    title: 'Teamwork',
    description: 'Coordinated patrol operations, inter-departmental support, and synchronized handover protocols.',
    iconName: 'UserCheck',
    category: 'interpersonal',
  },
  {
    id: 'skill-time',
    title: 'Time Management',
    description: 'Punctual shift execution, strict patrol intervals, and immediate emergency dispatch response times.',
    iconName: 'Clock',
    category: 'operational',
  },
  {
    id: 'skill-leadership',
    title: 'Leadership',
    description: 'Guiding crowd movements during incidents, taking ownership of critical posts, and inspiring trust.',
    iconName: 'Sparkles',
    category: 'tactical',
  },
  {
    id: 'skill-communication',
    title: 'Effective Communication',
    description: 'Clear radio discipline, concise verbal debriefs, and polite conflict de-escalation with guests.',
    iconName: 'MessageSquare',
    category: 'interpersonal',
  },
  {
    id: 'skill-critical-thinking',
    title: 'Critical Thinking',
    description: 'Analytical assessment of suspicious behaviors, rapid contingency evaluation under pressure, and systematic incident resolution.',
    iconName: 'Lightbulb',
    category: 'tactical',
  },
];

export const languagesData: LanguageItem[] = [
  {
    code: 'NE',
    name: 'Nepali',
    level: 'Native / Fluent',
    proficiencyTag: 'Native',
    notes: 'Native mother tongue; clear, articulate communication.',
  },
  {
    code: 'EN',
    name: 'English',
    level: 'Professional Working',
    proficiencyTag: 'Fluent',
    notes: 'Effective verbal reports, guest assistance, incident debriefs, and log documentation.',
  },
  {
    code: 'HI',
    name: 'Hindi',
    level: 'Conversational & Professional',
    proficiencyTag: 'Fluent',
    notes: 'Wide day-to-day fluency with South Asian workforce, contractors, and visitors.',
  },
];
