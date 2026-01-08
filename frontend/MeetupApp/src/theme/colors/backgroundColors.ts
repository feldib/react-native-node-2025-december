export interface BackgroundColors {
  background: string;
  cardBackground: string;
}

const backgroundColorsLight: BackgroundColors = {
  background: '#ffffff',
  cardBackground: '#ffffff',
};

const backgroundColorsDark: BackgroundColors = {
  background: '#121212',
  cardBackground: '#1e1e1e',
};

export const backgroundColors = {
  light: backgroundColorsLight,
  dark: backgroundColorsDark,
};
