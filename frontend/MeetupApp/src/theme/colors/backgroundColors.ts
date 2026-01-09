export interface BackgroundColors {
  background: string;
  cardBackground: string;
}

const backgroundColorsLight: BackgroundColors = {
  background: '#ffffff',
  cardBackground: '#f8f9fa',
};

const backgroundColorsDark: BackgroundColors = {
  background: '#121212',
  cardBackground: '#1e1e1e',
};

export const backgroundColors = {
  light: backgroundColorsLight,
  dark: backgroundColorsDark,
};
