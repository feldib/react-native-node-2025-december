import React from 'react';

jest.mock('@/store/api', () => ({
  useRegisterMutation: () => [
    jest.fn().mockResolvedValue({
      data: {
        user: {},
        // token: ''
      },
    }),
    { isLoading: false },
  ],
}));

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { render } from '@testing-library/react-native';

test('RegisterForm renders', async () => {
  render(<RegisterForm />);
});
