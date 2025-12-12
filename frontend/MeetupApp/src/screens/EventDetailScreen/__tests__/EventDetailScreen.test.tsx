import React from 'react';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock('@/helpers/categories', () => ({
  getCategoryName: (c: any) => String(c),
  getCategoryIcon: () => 'icon',
}));

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) =>
    selector({
      auth: { user: { id: 10, firstName: 'A', lastName: 'B' } },
      events: {
        displayedCurrentEvent: {
          id: 1,
          name: 'Event',
          category: 'tech',
          startDate: new Date().toISOString(),
          finishDate: null,
          users: [],
        },
        displayedPastEvent: null,
        isLoading: false,
      },
    }),
}));

jest.mock('@/store/eventsSlice', () => ({
  fetchEventById: (id: number) => ({ type: 'events/fetchById', payload: id }),
}));

jest.mock('@react-navigation/native', () => {
  const actual = jest.requireActual('@react-navigation/native');
  return {
    ...actual,
    useRoute: () => ({ params: { eventId: 1, eventType: 'current' } }),
  };
});

import EventDetailScreen from '@/screens/EventDetailScreen/EventDetailScreen';
import { render } from '@testing-library/react-native';

test('EventDetailScreen renders', async () => {
  render(<EventDetailScreen />);
});
