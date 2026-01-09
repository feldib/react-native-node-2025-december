import LoginScreen from '@/screens/LoginScreen/LoginScreen';
import RegisterScreen from '@/screens/RegisterScreen/RegisterScreen';
import CurrentEventsScreen from '@/screens/CurrentEventsScreen/CurrentEventsScreen';
import PastEventsScreen from '@/screens/PastEventsScreen/PastEventsScreen';
import EventDetailScreen from '@/screens/EventDetailScreen/EventDetailScreen';
import ProfileScreen from '@/screens/ProfileScreen/ProfileScreen';

export type DisplayedEventType = 'current' | 'past';

export enum RouteKey {
  Login = 'login',
  Register = 'register',
  CurrentEventsTab = 'current_events_tab',
  PastEventsTab = 'past_events_tab',
  CurrentEventsList = 'current_events_list',
  PastEventsList = 'past_events_list',
  EventDetail = 'event_detail',
  Profile = 'profile',
}

export enum RouteName {
  Login = 'Login',
  Register = 'Register',
  CurrentEventsTab = 'CurrentEvents',
  PastEventsTab = 'PastEvents',
  CurrentEventsList = 'CurrentEventsList',
  PastEventsList = 'PastEventsList',
  EventDetail = 'EventDetail',
  Profile = 'ProfileScreen',
}

enum RouteLabel {
  CurrentEvents = 'Current Events',
  PastEvents = 'Past Events',
}

export const Routes = {
  [RouteKey.Login]: {
    name: RouteName.Login as const,
    component: LoginScreen,
  },
  [RouteKey.Register]: {
    name: RouteName.Register as const,
    component: RegisterScreen,
  },
  [RouteKey.CurrentEventsTab]: {
    name: RouteName.CurrentEventsTab as const,
    label: RouteLabel.CurrentEvents,
    component: CurrentEventsScreen,
  },
  [RouteKey.PastEventsTab]: {
    name: RouteName.PastEventsTab as const,
    label: RouteLabel.PastEvents,
    component: PastEventsScreen,
  },
  [RouteKey.CurrentEventsList]: {
    name: RouteName.CurrentEventsList as const,
    component: CurrentEventsScreen,
    eventType: 'current' as DisplayedEventType,
  },
  [RouteKey.PastEventsList]: {
    name: RouteName.PastEventsList as const,
    component: PastEventsScreen,
    eventType: 'past' as DisplayedEventType,
  },
  [RouteKey.EventDetail]: {
    name: RouteName.EventDetail as const,
    component: EventDetailScreen,
  },
  [RouteKey.Profile]: {
    name: RouteName.Profile as const,
    component: ProfileScreen,
  },
};
