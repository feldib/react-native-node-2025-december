import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Routes, RouteKey } from '@/enums/routes';

const LoggedOutNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={Routes[RouteKey.Login].name}
        component={Routes[RouteKey.Login].component}
      />
      <Stack.Screen
        name={Routes[RouteKey.Register].name}
        component={Routes[RouteKey.Register].component}
      />
    </Stack.Navigator>
  );
};

export default LoggedOutNavigation;
