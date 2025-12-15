import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';
import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import EventsStack from '@/components/navigation/EventsStack/EventsStack';
import { Routes, RouteKey, RouteName } from '@/enums/routes';

export type TabNavigationParamList = {
  [RouteName.CurrentEventsTab]: undefined;
  [RouteName.PastEventsTab]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name={Routes[RouteKey.CurrentEventsTab].name}
        options={{ tabBarLabel: Routes[RouteKey.CurrentEventsTab].label }}
      >
        {() => (
          <EventsStack
            listScreenName={Routes[RouteKey.CurrentEventsList].name}
            listComponent={CurrentEventsScreen}
            title={Routes[RouteKey.CurrentEventsList].title}
            eventType={Routes[RouteKey.CurrentEventsList].eventType}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={Routes[RouteKey.PastEventsTab].name}
        options={{ tabBarLabel: Routes[RouteKey.PastEventsTab].label }}
      >
        {() => (
          <EventsStack
            listScreenName={Routes[RouteKey.PastEventsList].name}
            listComponent={PastEventsScreen}
            title={Routes[RouteKey.PastEventsList].title}
            eventType={Routes[RouteKey.PastEventsList].eventType}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigation;
