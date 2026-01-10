import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

jest.mock('@/hooks/queries/useAuth', () => ({
  useLoginMutation: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isPending: false,
    error: null,
  }),
}));

import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { render } from '@testing-library/react-native';

test('LoginForm renders', async () => {
  render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>,
  );
});
