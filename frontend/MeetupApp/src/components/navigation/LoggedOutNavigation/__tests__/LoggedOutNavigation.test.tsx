import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import LoggedOutNavigation from '@/components/navigation/LoggedOutNavigation/LoggedOutNavigation';
import { render } from '@testing-library/react-native';

test('LoggedOutNavigation renders', async () => {
  render(
    <Provider store={store}>
      <NavigationContainer>
        <LoggedOutNavigation />
      </NavigationContainer>
    </Provider>,
  );
});
