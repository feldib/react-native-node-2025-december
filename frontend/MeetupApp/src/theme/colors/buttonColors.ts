export interface ButtonColors {
  buttonDisabled: string;
}

const buttonColorsLight: ButtonColors = {
  buttonDisabled: '#6c757d',
};

const buttonColorsDark: ButtonColors = {
  buttonDisabled: '#4a4a4a',
};

export const buttonColors = {
  light: buttonColorsLight,
  dark: buttonColorsDark,
};
