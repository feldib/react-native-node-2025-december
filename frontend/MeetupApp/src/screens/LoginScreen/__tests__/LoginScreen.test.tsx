import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@/components/forms/LoginForm/LoginForm', () => {
  return () => null;
});

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    setAuth: jest.fn(),
    logout: jest.fn(),
    isLoading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import { render } from '@testing-library/react-native';

test('LoginScreen renders', async () => {
  render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>,
  );
});
