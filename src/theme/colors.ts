export interface ThemeColors {
  // Surfaces
  canvas: string;
  canvasElevated: string;
  canvasSubtle: string;
  card: string;
  cardElevated: string;
  cardSubtle: string;
  
  // Borders
  border: string;
  borderStrong: string;
  borderSubtle: string;
  
  // Typography
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textFaint: string;
  textOnPrimary: string;
  
  // Primary & Interactive
  primary: string;
  primaryHover: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  
  // Semantic
  success: string;
  successSoft: string;
  successBorder: string;
  warning: string;
  warningSoft: string;
  warningBorder: string;
  error: string;
  errorSoft: string;
  errorBorder: string;
  
  // Specialized Brand Accents (Vercel Mesh Trio)
  violet: string;
  violetSoft: string;
  cyan: string;
  cyanSoft: string;
  amber: string;
  amberSoft: string;
  rose: string;
  roseSoft: string;
  teal: string;
  tealSoft: string;
  
  // Chrome elements
  tabBarBg: string;
  tabBarBorder: string;
  tabActiveBg: string;
  tabActiveText: string;
  tabInactiveText: string;
  badgeBg: string;
  badgeText: string;
}

export const lightColors: ThemeColors = {
  // Clean, near-white Vercel canvas (#FAFAFA) and elevated cards (#FFFFFF)
  canvas: '#FAFAFA',
  canvasElevated: '#FFFFFF',
  canvasSubtle: '#F4F4F5',
  card: '#FFFFFF',
  cardElevated: '#FFFFFF',
  cardSubtle: '#F8FAFC',
  
  // Crisp hairline 1px borders (#EBEBEB & #E4E4E7)
  border: '#EBEBEB',
  borderStrong: '#D4D4D8',
  borderSubtle: '#F2F2F2',
  
  // Deep ink typography (#171717)
  textPrimary: '#171717',
  textSecondary: '#52525B',
  textMuted: '#71717A',
  textFaint: '#A1A1AA',
  textOnPrimary: '#FFFFFF',
  
  // Ink primary and Vercel electric blue accent
  primary: '#171717',
  primaryHover: '#262626',
  accent: '#0070F3',
  accentSoft: '#EFF6FF',
  accentBorder: '#BFDBFE',
  
  // Status
  success: '#10B981',
  successSoft: '#ECFDF5',
  successBorder: '#A7F3D0',
  warning: '#F59E0B',
  warningSoft: '#FFFBEB',
  warningBorder: '#FDE68A',
  error: '#EF4444',
  errorSoft: '#FEF2F2',
  errorBorder: '#FECACA',
  
  // Brand accents
  violet: '#7928CA',
  violetSoft: '#F5F3FF',
  cyan: '#06B6D4',
  cyanSoft: '#ECFEFF',
  amber: '#D97706',
  amberSoft: '#FFFBEB',
  rose: '#F43F5E',
  roseSoft: '#FFF1F2',
  teal: '#14B8A6',
  tealSoft: '#F0FDFA',
  
  // TabBar & Badges
  tabBarBg: '#FFFFFF',
  tabBarBorder: '#E5E7EB',
  tabActiveBg: '#F4F4F5',
  tabActiveText: '#171717',
  tabInactiveText: '#71717A',
  badgeBg: '#171717',
  badgeText: '#FFFFFF',
};

export const darkColors: ThemeColors = {
  // Signature Vercel OLED pitch black (#000000) and charcoal elevated cards (#0A0A0A / #121212)
  canvas: '#000000',
  canvasElevated: '#0A0A0A',
  canvasSubtle: '#141414',
  card: '#0D0D0D',
  cardElevated: '#171717',
  cardSubtle: '#1A1A1A',
  
  // Sleek dark hairline borders (#262626 & #333333)
  border: '#262626',
  borderStrong: '#3A3A3A',
  borderSubtle: '#1F1F1F',
  
  // High-contrast crisp typography (#EDEDED)
  textPrimary: '#EDEDED',
  textSecondary: '#A1A1AA',
  textMuted: '#71717A',
  textFaint: '#52525B',
  textOnPrimary: '#000000',
  
  // Bright white primary on dark & electric blue accent
  primary: '#EDEDED',
  primaryHover: '#FFFFFF',
  accent: '#0070F3',
  accentSoft: 'rgba(0, 112, 243, 0.15)',
  accentBorder: 'rgba(0, 112, 243, 0.35)',
  
  // Status in dark mode
  success: '#10B981',
  successSoft: 'rgba(16, 185, 129, 0.15)',
  successBorder: 'rgba(16, 185, 129, 0.3)',
  warning: '#F59E0B',
  warningSoft: 'rgba(245, 158, 11, 0.15)',
  warningBorder: 'rgba(245, 158, 11, 0.3)',
  error: '#EF4444',
  errorSoft: 'rgba(239, 68, 68, 0.15)',
  errorBorder: 'rgba(239, 68, 68, 0.3)',
  
  // Brand accents in dark mode
  violet: '#A855F7',
  violetSoft: 'rgba(168, 85, 247, 0.15)',
  cyan: '#22D3EE',
  cyanSoft: 'rgba(34, 211, 238, 0.15)',
  amber: '#FBBF24',
  amberSoft: 'rgba(251, 191, 36, 0.15)',
  rose: '#FB7185',
  roseSoft: 'rgba(251, 113, 133, 0.15)',
  teal: '#2DD4BF',
  tealSoft: 'rgba(45, 212, 191, 0.15)',
  
  // TabBar & Badges
  tabBarBg: '#080808',
  tabBarBorder: '#222222',
  tabActiveBg: '#1C1C1C',
  tabActiveText: '#FFFFFF',
  tabInactiveText: '#71717A',
  badgeBg: '#EDEDED',
  badgeText: '#000000',
};

// Unit-specific semantic color coding for the 7 study units
export const unitColorMap: Record<number, { primary: string; softLight: string; softDark: string; borderLight: string; borderDark: string }> = {
  1: {
    primary: '#0070F3', // Electric Blue (LIS Foundations)
    softLight: '#EFF6FF',
    softDark: 'rgba(0, 112, 243, 0.15)',
    borderLight: '#BFDBFE',
    borderDark: 'rgba(0, 112, 243, 0.35)',
  },
  2: {
    primary: '#10B981', // Emerald (Classification & DDC/CC)
    softLight: '#ECFDF5',
    softDark: 'rgba(16, 185, 129, 0.15)',
    borderLight: '#A7F3D0',
    borderDark: 'rgba(16, 185, 129, 0.35)',
  },
  3: {
    primary: '#8B5CF6', // Royal Violet (Reference Sources)
    softLight: '#F5F3FF',
    softDark: 'rgba(139, 92, 246, 0.15)',
    borderLight: '#DDD6FE',
    borderDark: 'rgba(139, 92, 246, 0.35)',
  },
  4: {
    primary: '#06B6D4', // Cyan (Management & Administration)
    softLight: '#ECFEFF',
    softDark: 'rgba(6, 182, 212, 0.15)',
    borderLight: '#A5F3FC',
    borderDark: 'rgba(6, 182, 212, 0.35)',
  },
  5: {
    primary: '#14B8A6', // Teal (Automation & ICT)
    softLight: '#F0FDFA',
    softDark: 'rgba(20, 184, 166, 0.15)',
    borderLight: '#99F6E4',
    borderDark: 'rgba(20, 184, 166, 0.35)',
  },
  6: {
    primary: '#F59E0B', // Amber (Bihar Special GK)
    softLight: '#FFFBEB',
    softDark: 'rgba(245, 158, 11, 0.15)',
    borderLight: '#FDE68A',
    borderDark: 'rgba(245, 158, 11, 0.35)',
  },
  7: {
    primary: '#F43F5E', // Rose (Teaching Aptitude)
    softLight: '#FFF1F2',
    softDark: 'rgba(244, 63, 94, 0.15)',
    borderLight: '#FECDD3',
    borderDark: 'rgba(244, 63, 94, 0.35)',
  },
};

// Question category color map
export const categoryColorMap: Record<string, string> = {
  lis_foundations: '#0070F3',
  classification_cataloguing: '#10B981',
  reference_sources: '#8B5CF6',
  automation_ict: '#14B8A6',
  management: '#06B6D4',
  bihar_gk: '#F59E0B',
  teaching_aptitude: '#F43F5E',
};

// Difficulty color mapping
export const difficultyColorMap = {
  easy: { color: '#10B981', label: 'EASY', labelHi: 'सरल' },
  medium: { color: '#F59E0B', label: 'MEDIUM', labelHi: 'मध्यम' },
  hard: { color: '#EF4444', label: 'HARD', labelHi: 'कठिन' },
};

// Preset gradients
export const gradientPresets = {
  heroVercel: ['#0070F3', '#7928CA', '#EB367F'] as const,
  heroDark: ['#0A192F', '#090D16', '#0A0A0A'] as const,
  heroLight: ['#1E3A8A', '#2563EB', '#3B82F6'] as const,
  primaryBtn: ['#0070F3', '#0052CC'] as const,
  emerald: ['#10B981', '#059669'] as const,
  amber: ['#F59E0B', '#D97706'] as const,
  violet: ['#8B5CF6', '#6D28D9'] as const,
};
