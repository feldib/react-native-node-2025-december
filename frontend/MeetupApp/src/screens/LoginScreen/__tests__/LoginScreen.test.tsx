import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@/components/forms/LoginForm/LoginForm', () => {
  return () => null;
});

import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import { render } from '@testing-library/react-native';

test('LoginScreen renders', async () => {
  render(
    <NavigationContainer>
      <LoginScreen />
    </NavigationContainer>,
  );
});
