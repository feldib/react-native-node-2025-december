import React from 'react';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/store/api', () => ({
  useGetEventsQuery: () => ({
    data: [],
  }),
}));

import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';
import { render } from '@testing-library/react-native';

test('PastEventsScreen renders', async () => {
  render(<PastEventsScreen />);
});
