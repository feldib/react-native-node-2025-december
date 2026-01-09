export interface ButtonColors {
  // Background colors for buttons
  buttonPrimary: string;
  buttonPrimaryHover: string;
  buttonPrimaryActive: string;
  buttonSecondary: string;
  buttonSecondaryHover: string;
  buttonSecondaryActive: string;
  buttonDisabled: string;
  // Text colors for buttons
  buttonPrimaryText: string;
  buttonSecondaryText: string;
  buttonDisabledText: string;
}

const buttonColorsLight: ButtonColors = {
  // Background colors for buttons
  buttonPrimary: '#3f5eadff',
  buttonPrimaryHover: '#3659c9ff',
  buttonPrimaryActive: '#2d47a3ff',
  buttonSecondary: '#6c7899ff',
  buttonSecondaryHover: '#5a668dff',
  buttonSecondaryActive: '#4a547fff',
  buttonDisabled: '#6c757d',
  // Text colors for buttons
  buttonPrimaryText: '#ffffff',
  buttonSecondaryText: '#ffffff',
  buttonDisabledText: '#e0e0e0',
};

const buttonColorsDark: ButtonColors = {
  // Background colors for buttons
  buttonPrimary: '#3f434dff',
  buttonPrimaryHover: '#4e6fc3ff',
  buttonPrimaryActive: '#425fafff',
  buttonSecondary: '#8a97baff',
  buttonSecondaryHover: '#7986acff',
  buttonSecondaryActive: '#697594ff',
  buttonDisabled: '#4a4a4a',
  // Text colors for buttons
  buttonPrimaryText: '#ffffff',
  buttonSecondaryText: '#ffffff',
  buttonDisabledText: '#b0b0b0',
};

export const buttonColors = {
  light: buttonColorsLight,
  dark: buttonColorsDark,
};
