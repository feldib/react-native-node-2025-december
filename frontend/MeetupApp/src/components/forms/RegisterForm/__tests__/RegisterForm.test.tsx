import React from 'react';
import { AuthProvider } from '@/context/AuthContext';

jest.mock('@/hooks/queries/useAuth', () => ({
  useRegisterMutation: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isPending: false,
    error: null,
  }),
}));

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { render } from '@testing-library/react-native';

test('RegisterForm renders', async () => {
  render(
    <AuthProvider>
      <RegisterForm />
    </AuthProvider>,
  );
});
