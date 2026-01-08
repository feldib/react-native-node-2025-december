// Global Jest setup for RN project

// Mock FontAwesome (ESM package) to avoid transform issues in tests
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

// Silence RN Animated warnings that can fail tests (RN 0.82 path)
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// Mock AsyncStorage for Jest environment
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock ThemeContext to avoid wrapping every test with ThemeProvider
jest.mock('@/theme/ThemeContext', () => {
  const { themes } = require('./src/theme/colors');
  return {
    useTheme: () => ({
      theme: 'light',
      colors: themes.light,
      isDark: false,
    }),
    ThemeProvider: ({ children }: any) => children,
  };
});

// Enable Testing Library's extended matchers (jest-native)
import '@testing-library/jest-native/extend-expect';
