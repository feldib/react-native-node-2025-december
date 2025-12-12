import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';

import AppNavigator from '@/components/navigation/AppNavigator/AppNavigator';
import { render } from '@testing-library/react-native';

test('AppNavigator renders', async () => {
  render(
    <Provider store={store}>
      <AppNavigator />
    </Provider>,
  );
});
