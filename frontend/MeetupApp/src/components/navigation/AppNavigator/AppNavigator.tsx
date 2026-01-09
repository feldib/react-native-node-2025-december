import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
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
  const user = useAppSelector(state => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <TabNavigation /> : <LoggedOutNavigation />}
    </NavigationContainer>
  );
}

export default AppNavigator;
