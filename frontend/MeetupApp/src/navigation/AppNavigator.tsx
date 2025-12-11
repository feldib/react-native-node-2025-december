import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../../src/store/hooks';
import TabNavigation from '../../src/navigation/TabNavigation';
import LoggedOutNavigation from '../../src/navigation/LoggedOutNavigation';

function AppNavigator() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <LoggedOutNavigation />}
    </NavigationContainer>
  );
}

export default AppNavigator;
