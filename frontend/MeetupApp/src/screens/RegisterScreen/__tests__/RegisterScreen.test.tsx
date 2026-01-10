import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@/components/forms/RegisterForm/RegisterForm', () => {
  return () => null;
});

import RegisterScreen from '@/screens/RegisterScreen/RegisterScreen';
import { render } from '@testing-library/react-native';

test('RegisterScreen renders', async () => {
  render(
    <NavigationContainer>
      <RegisterScreen />
    </NavigationContainer>,
  );
});
