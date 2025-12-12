import React from 'react';

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) =>
    selector({
      auth: {
        user: { id: 1, firstName: 'A', lastName: 'B', email: 'a@b.com' },
      },
    }),
}));

jest.mock('@/store/authSlice', () => ({
  logout: () => ({ type: 'auth/logout' }),
}));

import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';
import { render } from '@testing-library/react-native';

test('ProfileScreen renders', async () => {
  render(<ProfileScreen />);
});
