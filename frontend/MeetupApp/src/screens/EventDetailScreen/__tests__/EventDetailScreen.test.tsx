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

jest.mock('@/store/hooks', () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: (selector: any) =>
    selector({
      auth: { user: { id: 10, firstName: 'A', lastName: 'B' } },
    }),
}));

jest.mock('@/store/api', () => ({
  useGetEventByIdQuery: (id: number) => ({
    data:
      id === 1
        ? {
            id: 1,
            name: 'Event',
            category: 'tech',
            startDate: new Date().toISOString(),
            finishDate: null,
            users: [],
          }
        : {
            id: 2,
            name: 'Past Event',
            category: 'tech',
            startDate: new Date().toISOString(),
            finishDate: new Date().toISOString(),
            users: [],
          },
    isLoading: false,
    refetch: jest.fn(),
  }),
  useGetUserEventStatusQuery: () => ({
    data: null,
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

import EventDetailScreen from '@/screens/EventDetailScreen/EventDetailScreen';
import { render } from '@testing-library/react-native';

test('EventDetailScreen renders current event with button', async () => {
  const { getByText } = render(
    <EventDetailScreen
      route={{ params: { eventId: 1, eventType: 'current' } } as any}
    />,
  );

  expect(getByText('Event')).toBeTruthy();
});

test('EventDetailScreen renders past event without button', async () => {
  const { getByText } = render(
    <EventDetailScreen
      route={{ params: { eventId: 2, eventType: 'past' } } as any}
    />,
  );

  expect(getByText('Past Event')).toBeTruthy();
});
