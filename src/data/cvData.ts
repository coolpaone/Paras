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
  avatarCropUrl: '/images/paras-original-avatar.jpg',
  website: 'www.parasnepali.com.np',
  photos: [
    {
      id: 'photo-burj-skyline',
      url: '/images/FB_IMG_1788849989523.jpg',
      title: 'Dubai Luxury Lounge & Burj Khalifa Skyline',
      category: 'Hospitality & Luxury',
      description: 'Formal business attire in an upscale Dubai penthouse lounge overlooking the Burj Khalifa and Downtown skyline.',
      locationTag: 'Dubai, UAE',
      featured: true,
    },
    {
      id: 'photo-marble-lobby',
      url: '/images/FB_IMG_1788850013362.jpg',
      title: 'Corporate Security & Concierge Formal Portrait',
      category: 'Corporate Security',
      description: 'Sharp black suit and tie in a luxury white marble lobby, demonstrating high-standard personal presentation and professionalism.',
      locationTag: 'One & Only One Za\'abeel / Dubai',
      featured: true,
    },
    {
      id: 'photo-retail-uniform',
      url: '/images/FB_IMG_1788850092856.jpg',
      title: 'Commercial Facility & Retail Floor Deployment',
      category: 'Commercial & Retail',
      description: 'Tailored royal blue formal blazer representing high-visibility floor security, loss prevention, and customer liaison.',
      locationTag: 'Dubai Outlet Mall, UAE',
      featured: true,
    },
    {
      id: 'photo-casual-profile',
      url: '/images/FB_IMG_1788850023339.jpg',
      title: 'Personal Profile & Off-Duty Portrait',
      category: 'Personal Portfolio',
      description: 'Contemporary casual portrait showcasing approachable personal demeanor, discipline, and strong presence.',
      locationTag: 'UAE',
      featured: false,
    },
  ],
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
