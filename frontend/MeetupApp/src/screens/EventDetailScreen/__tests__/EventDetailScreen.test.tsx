import React from 'react';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock('@/helpers/categories', () => ({
  getCategoryName: (c: any) => String(c),
  getCategoryIcon: () => 'icon',
}));

jest.mock('@/components/event/UserIconSection/UserIconSection', () => {
  return function MockUserIconSection() {
    return null;
  };
});

jest.mock('@/screens/EventDetailScreen/useJoinButton', () => ({
  __esModule: true,
  default: () => ({
    buttonConfig: {
      text: 'Join',
      disabled: false,
      style: {},
    },
    handleJoin: jest.fn(),
  }),
}));

jest.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 10, firstName: 'A', lastName: 'B' },
    setAuth: jest.fn(),
    logout: jest.fn(),
    isLoading: false,
  }),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

jest.mock('@/hooks/queries/useEvents', () => ({
  useEventQuery: jest.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
  useUserEventStatusQuery: jest.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
  })),
}));

import EventDetailScreen from '@/screens/EventDetailScreen/EventDetailScreen';
import { render } from '@testing-library/react-native';
import * as useEventsHooks from '@/hooks/queries/useEvents';

test('EventDetailScreen renders current event with button', async () => {
  (useEventsHooks.useEventQuery as jest.Mock).mockReturnValue({
    data: {
      id: 1,
      name: 'Event',
      category: 'tech',
      startDate: new Date().toISOString(),
      finishDate: null,
      users: [],
    },
    isLoading: false,
    error: null,
  });

  (useEventsHooks.useUserEventStatusQuery as jest.Mock).mockReturnValue({
    data: null,
    isLoading: false,
    error: null,
  });

  const { getByText } = render(
    <EventDetailScreen
      route={{ params: { eventId: 1, eventType: 'current' } } as any}
    />,
  );

  expect(getByText('Event')).toBeTruthy();
});

test('EventDetailScreen renders past event without button', async () => {
  (useEventsHooks.useEventQuery as jest.Mock).mockReturnValue({
    data: {
      id: 2,
      name: 'Past Event',
      category: 'tech',
      startDate: new Date().toISOString(),
      finishDate: new Date().toISOString(),
      users: [],
    },
    isLoading: false,
    error: null,
  });

  (useEventsHooks.useUserEventStatusQuery as jest.Mock).mockReturnValue({
    data: null,
    isLoading: false,
    error: null,
  });

  const { getByText } = render(
    <EventDetailScreen
      route={{ params: { eventId: 2, eventType: 'past' } } as any}
    />,
  );

  expect(getByText('Past Event')).toBeTruthy();
});
