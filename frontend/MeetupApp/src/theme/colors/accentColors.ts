export interface AccentColors {
  accent: string;
  success: string;
  warning: string;
  error: string;
}

const accentColorsLight: AccentColors = {
  accent: '#007AFF',
  success: '#28a745',
  warning: '#ffc107',
  error: '#dc3545',
};

const accentColorsDark: AccentColors = {
  accent: '#0a84ff',
  success: '#32d74b',
  warning: '#ffd60a',
  error: '#ff453a',
};

export const accentColors = {
  light: accentColorsLight,
  dark: accentColorsDark,
};
