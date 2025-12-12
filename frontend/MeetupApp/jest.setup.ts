// Global Jest setup for RN project

// Mock FontAwesome (ESM package) to avoid transform issues in tests
jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

// Silence RN Animated warnings that can fail tests (RN 0.82 path)
jest.mock('react-native/src/private/animated/NativeAnimatedHelper');

// Enable Testing Library's extended matchers (jest-native)
import '@testing-library/jest-native/extend-expect';
