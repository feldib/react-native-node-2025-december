import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Pressable } from 'react-native';
import React from 'react';
import {
  Routes,
  RouteKey,
  DisplayedEventType,
  RouteName,
} from '@/enums/routes';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

export type EventsStackParamList = {
  [RouteName.EventDetail]: { eventId: number; eventType: DisplayedEventType };
  [RouteName.Profile]: undefined;
  [RouteName.CurrentEventsList]: undefined;
  [RouteName.PastEventsList]: undefined;
};

interface EventsStackProps {
  listScreenName: RouteName.CurrentEventsList | RouteName.PastEventsList;
  listComponent: React.ComponentType<any>;
  title: string;
  eventType: DisplayedEventType;
}

const Stack = createNativeStackNavigator<EventsStackParamList>();

const ProfileHeaderButton = React.memo(
  ({ onPress }: { onPress: () => void }) => (
    <Pressable onPress={onPress}>
      <FontAwesomeIcon
        icon={faPerson as IconProp}
        size={20}
        color="#6c7899ff"
      />
    </Pressable>
  ),
);

export default function EventsStack({
  listScreenName,
  listComponent,
  title,
  eventType,
}: EventsStackProps) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Stack.Screen
        name={listScreenName}
        component={listComponent}
        options={({ navigation }) => ({
          title,
          headerRight: () => (
            <ProfileHeaderButton
              onPress={() => navigation.navigate(Routes[RouteKey.Profile].name)}
            />
          ),
        })}
      />
      <Stack.Screen
        name={Routes[RouteKey.EventDetail].name}
        component={Routes[RouteKey.EventDetail].component}
        options={{ title: t('navigation.eventDetail') }}
        initialParams={{ eventType }}
      />
      <Stack.Screen
        name={Routes[RouteKey.Profile].name}
        component={Routes[RouteKey.Profile].component}
        options={{ title: t('navigation.profile') }}
      />
    </Stack.Navigator>
  );
}
