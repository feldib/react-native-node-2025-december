import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { StaticScreenProps } from '@react-navigation/native';
import { useEffect, useMemo } from 'react';
import { getCategoryName, getCategoryIcon } from '@/helpers/categories';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchEventById, fetchUserEventStatus } from '@/store/eventsSlice';
import UserIconSection from '@/components/event/UserIconSection/UserIconSection';
import { DisplayedEventType } from '@/enums/routes';
import useJoinButton from './useJoinButton';
import { useTheme } from '@/theme/ThemeContext';

type EventDetailScreenProps = StaticScreenProps<{
  eventId: number;
  eventType: DisplayedEventType;
}>;

const EventDetailScreen = ({ route }: EventDetailScreenProps) => {
  const { colors } = useTheme();

  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const {
    displayedCurrentEvent,
    displayedPastEvent,
    userEventStatus,
    isLoading: loading,
  } = useAppSelector(state => state.events);

  const { eventId, eventType } = route.params;

  const event = useMemo(() => {
    return eventType === 'current' ? displayedCurrentEvent : displayedPastEvent;
  }, [eventType, displayedCurrentEvent, displayedPastEvent]);

  const finishDate = useMemo(() => {
    if (!event || !event.finishDate) return false;
    return new Date(event.finishDate);
  }, [event]);

  useEffect(() => {
    dispatch(fetchEventById(eventId));
  }, [eventId, dispatch]);

  useEffect(() => {
    // Only fetch user event status for current events, not past events
    if (user && eventType === 'current') {
      dispatch(fetchUserEventStatus({ eventId, userId: user.id }));
    }
  }, [eventId, user, eventType, dispatch]);

  const { buttonConfig, handleJoin } = useJoinButton({
    userEventStatus,
    eventId,
    user,
    dispatch,
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const categoryIcon = getCategoryIcon(event.category);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.card,
          {
            borderColor: colors.textSecondary,
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <View style={styles.categoryHeader}>
          {categoryIcon && (
            <FontAwesomeIcon
              icon={categoryIcon as IconProp}
              size={20}
              color={colors.textSecondary}
            />
          )}
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {getCategoryName(event.category)}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.textTitle }]}>
          {event.name}
        </Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {eventType === 'past' && (
          <Text>Finish date: {finishDate.toLocaleString()}</Text>
        )}
        <UserIconSection users={event.users} />

        {eventType === 'current' ? (
          <TouchableOpacity
            style={[styles.button, buttonConfig.style]}
            disabled={buttonConfig.disabled}
            onPress={handleJoin}
          >
            <Text
              style={[styles.buttonText, { color: colors.buttonPrimaryText }]}
            >
              {buttonConfig.text}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '500',
  },
  button: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventDetailScreen;
