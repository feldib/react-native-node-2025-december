import React from 'react';

jest.mock('@/store/api', () => ({
  useLoginMutation: () => [
    jest.fn().mockResolvedValue({
      data: {
        user: {},
        // token: ''
      },
    }),
    { isLoading: false },
  ],
}));

import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { render } from '@testing-library/react-native';

test('LoginForm renders', async () => {
  render(<LoginForm />);
});
