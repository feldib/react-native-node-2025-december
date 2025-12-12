import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

jest.mock('@/components/navigation/EventsStack/EventsStack', () => {
  return () => null;
});

import TabNavigation from '@/components/navigation/TabNavigation/TabNavigation';
import { render } from '@testing-library/react-native';

test('TabNavigation renders', async () => {
  render(
    <Provider store={store}>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
    </Provider>,
  );
});
