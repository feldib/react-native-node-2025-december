import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useMemo, useCallback } from 'react';
import { getCategoryName, getCategoryIcon } from '@/helpers/categories';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  fetchEventById,
  joinEvent as joinEventAction,
  fetchUserEventStatus,
} from '@/store/eventsSlice';
import UserIconSection from '@/components/event/UserIconSection/UserIconSection';

const EventDetailScreen = () => {
  const route = useRoute();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const {
    displayedCurrentEvent,
    displayedPastEvent,
    userEventStatus,
    isLoading: loading,
  } = useAppSelector(state => state.events);

  // @ts-ignore - route params from navigation
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
    if (user) {
      dispatch(fetchUserEventStatus({ eventId, userId: user.id }));
    }
  }, [eventId, user, dispatch]);

  const isCreator = useMemo(
    () => userEventStatus?.isCreator || false,
    [userEventStatus],
  );
  const hasRequestedToJoin = useMemo(
    () => userEventStatus?.hasRequestedToJoin || false,
    [userEventStatus],
  );
  const isApproved = useMemo(
    () => userEventStatus?.isApproved || false,
    [userEventStatus],
  );

  const buttonConfig = useMemo(() => {
    if (isCreator) {
      return {
        text: "You're the creator",
        disabled: true,
        style: styles.creatorButton,
      };
    }
    if (hasRequestedToJoin && isApproved) {
      return {
        text: 'Joined',
        disabled: true,
        style: styles.joinedButton,
      };
    }
    if (hasRequestedToJoin && !isApproved) {
      return {
        text: 'Waiting for approval',
        disabled: true,
        style: styles.pendingButton,
      };
    }
    return {
      text: 'Join',
      disabled: false,
      style: styles.joinButton,
    };
  }, [isCreator, hasRequestedToJoin, isApproved]);

  const handleJoin = useCallback(async () => {
    if (!user) return;

    try {
      await dispatch(joinEventAction({ eventId, userId: user.id })).unwrap();
    } catch (error) {
      console.error('Error joining event:', error);
    }
  }, [user, eventId, dispatch]);

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
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.categoryHeader}>
          {categoryIcon && (
            <FontAwesomeIcon
              icon={categoryIcon as IconProp}
              size={20}
              color="#6c7899ff"
            />
          )}
          <Text style={styles.category}>{getCategoryName(event.category)}</Text>
        </View>
        <Text style={styles.title}>{event.name}</Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {finishDate && <Text>Finish date: {finishDate.toLocaleString()}</Text>}
        <UserIconSection users={event.users} />

        {!finishDate ? (
          <TouchableOpacity
            style={[styles.button, buttonConfig.style]}
            disabled={buttonConfig.disabled}
            onPress={handleJoin}
          >
            <Text style={styles.buttonText}>{buttonConfig.text}</Text>
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
    backgroundColor: 'white',
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#3f5eadff',
    backgroundColor: 'white',
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
    color: '#3f5eadff',
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#6c7899ff',
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
    color: '#fff',
  },
  joinButton: {
    backgroundColor: '#007AFF',
  },
  creatorButton: {
    backgroundColor: '#6c757d',
  },
  joinedButton: {
    backgroundColor: '#28a745',
  },
  pendingButton: {
    backgroundColor: '#ffc107',
  },
});

export default EventDetailScreen;
