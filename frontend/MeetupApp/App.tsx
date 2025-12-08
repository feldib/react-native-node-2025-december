import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabNavigation from './src/navigation/TabNavigation';

function App() {
  return (
    <SafeAreaProvider>
      <TabNavigation />
    </SafeAreaProvider>
  );
}

export default App;
