import React from 'react';
import { render } from '@testing-library/react-native';
import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/hooks/queries/useEvents', () => ({
  useEventsQuery: jest.fn(() => ({
    data: [
      {
        id: 1,
        name: 'Event 1',
        category: 'sports',
        startDate: new Date('2025-12-20'),
        finishDate: null,
        users: [],
      },
      {
        id: 2,
        name: 'Event 2',
        category: 'food',
        startDate: new Date('2025-12-25'),
        finishDate: null,
        users: [],
      },
    ],
    isLoading: false,
    error: null,
  })),
}));

test('CurrentEventsScreen renders', async () => {
  render(<CurrentEventsScreen />);
});
