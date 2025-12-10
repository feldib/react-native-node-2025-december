import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store/store';
import { useAppSelector } from './src/store/hooks';
import TabNavigation from './src/navigation/TabNavigation';
import LoggedOutNavigation from './src/navigation/LoggedOutNavigation';

function AppNavigator() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <LoggedOutNavigation />}
    </NavigationContainer>
  );
}

function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
