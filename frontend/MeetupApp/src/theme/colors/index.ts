import { backgroundColors, BackgroundColors } from './backgroundColors';
import { PrimaryColors, primaryColors } from './primaryColors';
import { TextColors, textColors } from './textColors';
import { AccentColors, accentColors } from './accentColors';
import { BorderColors, borderColors } from './borderColors';
import { ButtonColors, buttonColors } from './buttonColors';
import { AvatarColors, avatarColors } from './avatarColors';
import { Theme } from '@/types/theme/theme';

export interface ThemeColors
  extends PrimaryColors,
    BackgroundColors,
    TextColors,
    AccentColors,
    BorderColors,
    ButtonColors,
    AvatarColors {}

const createTheme = (theme: Theme): ThemeColors => ({
  ...primaryColors[theme],
  ...backgroundColors[theme],
  ...textColors[theme],
  ...accentColors[theme],
  ...borderColors[theme],
  ...buttonColors[theme],
  ...avatarColors[theme],
});

export const lightTheme = createTheme('light');
export const darkTheme = createTheme('dark');

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
