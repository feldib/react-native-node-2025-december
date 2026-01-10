import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '@/context/AuthContext';

import LoggedOutNavigation from '@/components/navigation/LoggedOutNavigation/LoggedOutNavigation';
import { render } from '@testing-library/react-native';

test('LoggedOutNavigation renders', async () => {
  render(
    <AuthProvider>
      <NavigationContainer>
        <LoggedOutNavigation />
      </NavigationContainer>
    </AuthProvider>,
  );
});
