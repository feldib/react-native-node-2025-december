import React from 'react';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) => selector({ events: { pastEvents: [] } }),
}));

jest.mock('@/store/eventsSlice', () => ({
  fetchEvents: () => ({ type: 'events/fetch' }),
}));

import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';
import { render } from '@testing-library/react-native';

test('PastEventsScreen renders', async () => {
  render(<PastEventsScreen />);
});
