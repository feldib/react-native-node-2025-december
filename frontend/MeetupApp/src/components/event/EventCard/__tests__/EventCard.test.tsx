import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

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
      auth: { user: null },
      events: { currentEvents: [], pastEvents: [] },
    }),
}));

import EventCard from '@/components/event/EventCard/EventCard';
import { render } from '@testing-library/react-native';

test('EventCard renders correctly', () => {
  const event = {
    id: 1,
    name: 'Test Event',
    category: 'tech',
    startDate: new Date().toISOString(),
    finishDate: null,
    users: [],
  } as any;

  render(
    <NavigationContainer>
      <EventCard event={event} />
    </NavigationContainer>,
  );
});
