import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState, useMemo, useCallback } from 'react';
import { Event } from '../types/Event';
import axios from 'axios';
import config from '../../config';
import { getCategoryName, getCategoryIcon } from '../helpers/categories';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAppSelector } from '../store/hooks';

const EventDetailScreen = () => {
  const route = useRoute();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAppSelector(state => state.auth);

  // @ts-ignore - route params from navigation
  const { eventId } = route.params;

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `${config.fetching.base}${config.fetching.events}/${eventId}`,
        );
        setEvent(response.data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const userEventRelation = useMemo(
    () => event?.users.find(u => u.userId === user?.id),
    [event?.users, user?.id],
  );

  const isCreator = useMemo(
    () => userEventRelation?.isCreator || false,
    [userEventRelation],
  );

  const isJoined = useMemo(() => !!userEventRelation, [userEventRelation]);

  const isApproved = useMemo(
    () => userEventRelation?.isApproved || false,
    [userEventRelation],
  );

  const buttonConfig = useMemo(() => {
    if (isCreator) {
      return {
        text: "You're the creator",
        disabled: true,
        style: styles.creatorButton,
      };
    }
    if (isJoined && isApproved) {
      return {
        text: 'Joined',
        disabled: true,
        style: styles.joinedButton,
      };
    }
    if (isJoined && !isApproved) {
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
  }, [isCreator, isJoined, isApproved]);

  const handleJoin = useCallback(async () => {
    if (!user) return;

    try {
      await axios.post(
        `${config.fetching.base}${config.fetching.events}/${eventId}/users`,
        { userId: user.id },
      );
      // Refresh event data
      const response = await axios.get(
        `${config.fetching.base}${config.fetching.events}/${eventId}`,
      );
      setEvent(response.data);
    } catch (error) {
      console.error('Error joining event:', error);
    }
  }, [user, eventId]);

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
        {event.finishDate !== null && (
          <Text>
            Finish date: {new Date(event.finishDate).toLocaleString()}
          </Text>
        )}
        <Text>Users: {event.users.length}</Text>

        <TouchableOpacity
          style={[styles.button, buttonConfig.style]}
          disabled={buttonConfig.disabled}
          onPress={handleJoin}
        >
          <Text style={styles.buttonText}>{buttonConfig.text}</Text>
        </TouchableOpacity>
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
