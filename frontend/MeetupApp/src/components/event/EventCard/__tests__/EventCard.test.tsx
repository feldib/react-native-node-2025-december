import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock('@/helpers/categories', () => ({
  getCategoryName: (c: any) => String(c),
  getCategoryIcon: () => 'icon',
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    setAuth: jest.fn(),
    logout: jest.fn(),
    isLoading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
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
