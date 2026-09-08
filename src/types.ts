export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  period: string;
  isCurrent?: boolean;
  locationsServed?: string[];
  responsibilities: string[];
  highlights?: string[];
}

export interface SkillItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  category: 'operational' | 'interpersonal' | 'tactical';
}

export interface LanguageItem {
  code: string;
  name: string;
  level: string;
  proficiencyTag: string;
  notes?: string;
}

export interface ProfilePhoto {
  id: string;
  url: string;
  title: string;
  category: string;
  description: string;
  locationTag: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  title: string;
  email: string;
  currentLocation: string;
  permanentLocation: string;
  yearsExperience: string;
  availability: string;
  bio: string;
  summaryStatement?: string;
  avatarCropUrl: string;
  website?: string;
  photos: ProfilePhoto[];
  stats: {
    label: string;
    sublabel: string;
  }[];
  strategicPillars: {
    title: string;
    description: string;
    iconName: string;
  }[];
}

export interface ContactFormData {
  name: string;
  company: string;
  subject: string;
  roleType: string;
  message: string;
}
