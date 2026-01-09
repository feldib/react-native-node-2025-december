// Global Jest setup for RN project

// Mock FontAwesome (ESM package) to avoid transform issues in tests
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

// Silence RN Animated warnings that can fail tests (RN 0.82 path)
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// Mock react-native-localize for Jest environment
jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
  ]),
  getNumberFormatSettings: jest.fn(() => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  })),
  getCalendar: jest.fn(() => 'gregorian'),
  getCountry: jest.fn(() => 'US'),
  getCurrencies: jest.fn(() => ['USD']),
  getTemperatureUnit: jest.fn(() => 'fahrenheit'),
  getTimeZone: jest.fn(() => 'America/New_York'),
  uses24HourClock: jest.fn(() => false),
  usesMetricSystem: jest.fn(() => false),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
}));

// Mock react-i18next to return translation keys as-is for testing
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'en',
      changeLanguage: jest.fn(),
    },
  }),
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

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
