import { Provider as ReduxProvider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/store';
import AppNavigator from './src/components/navigation/AppNavigator/AppNavigator';
import { ThemeProvider } from './src/theme/ThemeContext';

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
