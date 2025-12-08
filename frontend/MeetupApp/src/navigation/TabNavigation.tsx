import CurrentEventsScreen from '../screens/CurrentEventsScreen';
import PastEventsScreen from '../screens/PastEventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const CurrentEventsStack = createNativeStackNavigator({
  screens: {
    CurrentEventsList: {
      screen: CurrentEventsScreen,
      options: {
        title: 'Current Events',
      },
    },
    EventDetail: {
      screen: EventDetailScreen,
      options: {
        title: 'Event Details',
      },
    },
  },
});

const PastEventsStack = createNativeStackNavigator({
  screens: {
    PastEventsList: {
      screen: PastEventsScreen,
      options: {
        title: 'Past Events',
      },
    },
    EventDetail: {
      screen: EventDetailScreen,
      options: {
        title: 'Event Details',
      },
    },
  },
});

const Tabs = createBottomTabNavigator({
  screenOptions: {
    tabBarIcon: () => null,
    headerShown: false,
  },
  screens: {
    CurrentEvents: {
      screen: CurrentEventsStack,
      options: {
        tabBarLabel: 'Current Events',
      },
    },
    PastEvents: {
      screen: PastEventsStack,
      options: {
        tabBarLabel: 'Past Events',
      },
    },
  },
});

const TabNavigation = createStaticNavigation(Tabs);

export default TabNavigation;
