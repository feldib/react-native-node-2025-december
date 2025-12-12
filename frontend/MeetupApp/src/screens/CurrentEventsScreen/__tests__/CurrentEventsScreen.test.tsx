import React from 'react';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) =>
    selector({ events: { currentEvents: [] } }),
}));

jest.mock('@/store/eventsSlice', () => ({
  fetchEvents: () => ({ type: 'events/fetch' }),
}));

import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';
import { render } from '@testing-library/react-native';

test('CurrentEventsScreen renders', async () => {
  render(<CurrentEventsScreen />);
});
