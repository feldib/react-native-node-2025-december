export interface PrimaryColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;
}

const primaryColorsLight: PrimaryColors = {
  primary: '#3f5eadff',
  primaryDark: '#2d4586ff',
  primaryLight: '#6c7899ff',
};

const primaryColorsDark: PrimaryColors = {
  primary: '#5a7dd8ff',
  primaryDark: '#3f5eadff',
  primaryLight: '#8ca0c0ff',
};

export const primaryColors = {
  light: primaryColorsLight,
  dark: primaryColorsDark,
};
