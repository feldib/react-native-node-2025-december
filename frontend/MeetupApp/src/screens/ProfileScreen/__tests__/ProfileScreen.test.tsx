import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

jest.mock('@/context/AuthContext', () => {
  const originalModule = jest.requireActual('@/context/AuthContext');
  return {
    ...originalModule,
    useAuth: () => ({
      user: { id: 1, firstName: 'A', lastName: 'B', email: 'a@b.com' },
      setAuth: jest.fn(),
      logout: jest.fn(),
      isLoading: false,
    }),
  };
});

import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import { render } from '@testing-library/react-native';

test('ProfileScreen renders', async () => {
  render(
    <AuthProvider>
      <ProfileScreen />
    </AuthProvider>,
  );
});
