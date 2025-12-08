import { Text, StyleSheet, ScrollView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Event } from '../types/Event';
import axios from 'axios';
import config from '../../config';

const EventDetailScreen = () => {
  const route = useRoute();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.category}>
          {event.categoryName || 'Uncategorized'}
        </Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {event.finishDate !== null && (
          <Text>
            Finish date: {new Date(event.finishDate).toLocaleString()}
          </Text>
        )}
        <Text>Users: {event.users.length}</Text>
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
    textAlign: 'center',
    marginBottom: 5,
    color: '#6c7899ff',
  },
});

export default EventDetailScreen;
