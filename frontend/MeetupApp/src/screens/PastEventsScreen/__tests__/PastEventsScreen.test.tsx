import React from 'react';
import { render } from '@testing-library/react-native';
import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';

jest.mock('@/components/event/EventList/EventList', () => {
  return () => null;
});

jest.mock('@/hooks/queries/useEvents', () => ({
  useEventsQuery: jest.fn(() => ({
    data: [
      {
        id: 1,
        name: 'Past Event 1',
        category: 'sports',
        startDate: new Date('2025-10-20'),
        finishDate: new Date('2025-10-25'),
        users: [],
      },
      {
        id: 2,
        name: 'Past Event 2',
        category: 'food',
        startDate: new Date('2025-11-01'),
        finishDate: new Date('2025-11-05'),
        users: [],
      },
    ],
    isLoading: false,
    error: null,
  })),
}));

test('PastEventsScreen renders', async () => {
  render(<PastEventsScreen />);
});
