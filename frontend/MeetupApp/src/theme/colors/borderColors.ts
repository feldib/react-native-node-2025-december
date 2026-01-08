export interface BorderColors {
  border: string;
}

const borderColorsLight: BorderColors = {
  border: '#ddd',
};

const borderColorsDark: BorderColors = {
  border: '#333333',
};

export const borderColors = {
  light: borderColorsLight,
  dark: borderColorsDark,
};
