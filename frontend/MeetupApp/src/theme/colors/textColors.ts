export interface TextColors {
  text: string;
  textSecondary: string;
  textInverse: string;
}

const textColorsLight: TextColors = {
  text: '#333333',
  textSecondary: '#6c757d',
  textInverse: '#ffffff',
};

const textColorsDark: TextColors = {
  text: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textInverse: '#121212',
};

export const textColors = {
  light: textColorsLight,
  dark: textColorsDark,
};
