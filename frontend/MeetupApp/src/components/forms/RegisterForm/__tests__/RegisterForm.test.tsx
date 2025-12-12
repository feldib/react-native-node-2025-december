import React from 'react';

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

jest.mock('@/store/authSlice', () => ({
  register: () => ({ type: 'auth/register' }),
}));

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { render } from '@testing-library/react-native';

test('RegisterForm renders', async () => {
  render(<RegisterForm isLoading={false} />);
});
