import React from 'react';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/store/api', () => ({
  useGetEventsQuery: () => ({
    data: [],
  }),
}));

import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';
import { render } from '@testing-library/react-native';

test('CurrentEventsScreen renders', async () => {
  render(<CurrentEventsScreen />);
});
