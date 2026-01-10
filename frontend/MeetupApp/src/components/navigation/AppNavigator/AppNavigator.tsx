import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '@/context/AuthContext';
import TabNavigation, {
  TabNavigationParamList,
} from '@/components/navigation/TabNavigation/TabNavigation';
import LoggedOutNavigation, {
  LoggedOutStackParamList,
} from '@/components/navigation/LoggedOutNavigation/LoggedOutNavigation';
import { EventsStackParamList } from '@/components/navigation/EventsStack/EventsStack';

// Root param list combines all navigators
export type RootParamList = LoggedOutStackParamList &
  TabNavigationParamList &
  EventsStackParamList;

function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <LoggedOutNavigation />}
    </NavigationContainer>
  );
}

export default AppNavigator;
