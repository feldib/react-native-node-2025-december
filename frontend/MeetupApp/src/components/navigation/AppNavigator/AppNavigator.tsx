import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import TabNavigation from '@/components/navigation/TabNavigation/TabNavigation';
import LoggedOutNavigation from '@/components/navigation/LoggedOutNavigation/LoggedOutNavigation';

function AppNavigator() {
  const user = useAppSelector(state => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <LoggedOutNavigation />}
    </NavigationContainer>
  );
}

export default AppNavigator;
