import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';
import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import EventsStack from '@/components/navigation/EventsStack/EventsStack';
import { Routes, RouteKey, RouteName } from '@/enums/routes';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export type TabNavigationParamList = {
  [RouteName.CurrentEventsTab]: undefined;
  [RouteName.PastEventsTab]: undefined;
};

const Tab = createBottomTabNavigator<TabNavigationParamList>();

function TabNavigation() {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name={Routes[RouteKey.CurrentEventsTab].name}
        options={{ tabBarLabel: t('navigation.currentEvents') }}
      >
        {() => (
          <EventsStack
            listScreenName={Routes[RouteKey.CurrentEventsList].name}
            listComponent={CurrentEventsScreen}
            title={t('navigation.currentEvents')}
            eventType={Routes[RouteKey.CurrentEventsList].eventType}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={Routes[RouteKey.PastEventsTab].name}
        options={{ tabBarLabel: t('navigation.pastEvents') }}
      >
        {() => (
          <EventsStack
            listScreenName={Routes[RouteKey.PastEventsList].name}
            listComponent={PastEventsScreen}
            title={t('navigation.pastEvents')}
            eventType={Routes[RouteKey.PastEventsList].eventType}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default TabNavigation;
