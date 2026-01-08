import React, { createContext, useContext } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeColors, themes } from './colors';
import { Theme } from '@/types/theme/theme';

interface ThemeContextType {
  theme: Theme;
  colors: ThemeColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();

  // Derive theme directly from system color scheme
  const theme: Theme = systemColorScheme === 'dark' ? 'dark' : 'light';
  const colors = themes[theme];
  const isDark = theme === 'dark';

  const value: ThemeContextType = {
    theme,
    colors,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
