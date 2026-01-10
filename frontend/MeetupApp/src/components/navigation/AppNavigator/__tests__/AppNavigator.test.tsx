import React from 'react';
import AppNavigator from '@/components/navigation/AppNavigator/AppNavigator';
import { render } from '@testing-library/react-native';
import { AuthProvider } from '@/context/AuthContext';

test('AppNavigator renders', async () => {
  render(
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>,
  );
});
