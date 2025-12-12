import React from 'react';

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@/store/authSlice', () => ({
  login: () => ({ type: 'auth/login' }),
}));

import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { render } from '@testing-library/react-native';

test('LoginForm renders', async () => {
  render(<LoginForm isLoading={false} />);
});
