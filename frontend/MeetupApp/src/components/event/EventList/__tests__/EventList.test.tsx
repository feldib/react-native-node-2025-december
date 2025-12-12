import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@/components/event/EventCard/EventCard', () => {
  return () => null;
});

import EventList from '@/components/event/EventList/EventList';
import { render } from '@testing-library/react-native';

test('EventList renders correctly', () => {
  const events = [
    {
      id: 1,
      name: 'E1',
      category: 'tech',
      startDate: new Date().toISOString(),
      finishDate: null,
      users: [],
    },
    {
      id: 2,
      name: 'E2',
      category: 'art',
      startDate: new Date().toISOString(),
      finishDate: null,
      users: [],
    },
  ] as any[];

  render(
    <NavigationContainer>
      <EventList events={events} />
    </NavigationContainer>,
  );
});
