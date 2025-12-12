import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('@fortawesome/react-native-fontawesome', () => ({
  FontAwesomeIcon: () => null,
}));

import EventsStack from '@/components/navigation/EventsStack/EventsStack';
import { render } from '@testing-library/react-native';

const DummyList: React.ComponentType<any> = () => null;

test('EventsStack renders', async () => {
  render(
    <NavigationContainer>
      <EventsStack
        listScreenName="List"
        listComponent={DummyList}
        title="Title"
        eventType={'current' as any}
      />
    </NavigationContainer>,
  );
});
