import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CurrentEventsScreen from '../screens/CurrentEventsScreen';
import PastEventsScreen from '../screens/PastEventsScreen';
import EventDetailScreen from '../screens/EventDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';

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

enum RouteName {
  Login = 'Login',
  Register = 'Register',
  CurrentEventsTab = 'CurrentEvents',
  PastEventsTab = 'PastEvents',
  CurrentEventsList = 'CurrentEventsList',
  PastEventsList = 'PastEventsList',
  EventDetail = 'EventDetail',
  Profile = 'ProfileScreen',
}

enum RouteTitle {
  CurrentEvents = 'Current Events',
  PastEvents = 'Past Events',
  EventDetails = 'Event Details',
  Profile = 'Profile',
}

enum RouteLabel {
  CurrentEvents = 'Current Events',
  PastEvents = 'Past Events',
}

export const Routes = {
  [RouteKey.Login]: {
    name: RouteName.Login,
    component: LoginScreen,
  },
  [RouteKey.Register]: {
    name: RouteName.Register,
    component: RegisterScreen,
  },
  [RouteKey.CurrentEventsTab]: {
    name: RouteName.CurrentEventsTab,
    label: RouteLabel.CurrentEvents,
    component: CurrentEventsScreen,
  },
  [RouteKey.PastEventsTab]: {
    name: RouteName.PastEventsTab,
    label: RouteLabel.PastEvents,
    component: PastEventsScreen,
  },
  [RouteKey.CurrentEventsList]: {
    name: RouteName.CurrentEventsList,
    title: RouteTitle.CurrentEvents,
    component: CurrentEventsScreen,
    eventType: 'current' as DisplayedEventType,
  },
  [RouteKey.PastEventsList]: {
    name: RouteName.PastEventsList,
    title: RouteTitle.PastEvents,
    component: PastEventsScreen,
    eventType: 'past' as DisplayedEventType,
  },
  [RouteKey.EventDetail]: {
    name: RouteName.EventDetail,
    title: RouteTitle.EventDetails,
    component: EventDetailScreen,
  },
  [RouteKey.Profile]: {
    name: RouteName.Profile,
    title: RouteTitle.Profile,
    component: ProfileScreen,
  },
};
