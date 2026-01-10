module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|immer' +
      '|react-native-safe-area-context' +
      '|react-native-screens' +
      ')/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
