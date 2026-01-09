export interface TextColors {
  text: string;
  textTitle: string;
  textSecondary: string;
  textInverse: string;
  textLink: string;
  textError: string;
}

const textColorsLight: TextColors = {
  text: '#333333',
  textTitle: '#3f5eadff',
  textSecondary: '#6c757d',
  textInverse: '#ffffff',
  textLink: '#3f5eadff',
  textError: '#ff4d4f',
};

const textColorsDark: TextColors = {
  text: '#e0e0e0',
  textTitle: '#9bb7ffff',
  textSecondary: '#a0a0a0',
  textInverse: '#121212',
  textLink: '#9bb7ffff',
  textError: '#ff6f71',
};

export const textColors = {
  light: textColorsLight,
  dark: textColorsDark,
};
