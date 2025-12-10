import CurrentEventsScreen from '../screens/CurrentEventsScreen';
import PastEventsScreen from '../screens/PastEventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Pressable } from 'react-native';

const CurrentEventsStackNavigator = createNativeStackNavigator();
const PastEventsStackNavigator = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileHeaderButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable onPress={onPress}>
    <FontAwesomeIcon icon={faPerson as IconProp} size={20} color="#6c7899ff" />
  </Pressable>
);

function CurrentEventsStack() {
  return (
    <CurrentEventsStackNavigator.Navigator>
      <CurrentEventsStackNavigator.Screen
        name="CurrentEventsList"
        component={CurrentEventsScreen}
        options={({ navigation }) => ({
          title: 'Current Events',
          headerRight: () => (
            <ProfileHeaderButton
              onPress={() => navigation.navigate('ProfileScreen')}
            />
          ),
        })}
      />
      <CurrentEventsStackNavigator.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Event Details' }}
      />
      <CurrentEventsStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </CurrentEventsStackNavigator.Navigator>
  );
}

function PastEventsStack() {
  return (
    <PastEventsStackNavigator.Navigator>
      <PastEventsStackNavigator.Screen
        name="PastEventsList"
        component={PastEventsScreen}
        options={({ navigation }) => ({
          title: 'Past Events',
          headerRight: () => {
            const handlePress = () => navigation.navigate('ProfileScreen');
            return <ProfileHeaderButton onPress={handlePress} />;
          },
        })}
      />
      <PastEventsStackNavigator.Screen
        name="EventDetail"
        component={EventDetailScreen}
        options={{ title: 'Event Details' }}
      />
      <PastEventsStackNavigator.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </PastEventsStackNavigator.Navigator>
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIcon: () => null,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="CurrentEvents"
        component={CurrentEventsStack}
        options={{ tabBarLabel: 'Current Events' }}
      />
      <Tab.Screen
        name="PastEvents"
        component={PastEventsStack}
        options={{ tabBarLabel: 'Past Events' }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigation;
