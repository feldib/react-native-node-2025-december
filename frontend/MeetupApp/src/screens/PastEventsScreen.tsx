import { View } from 'react-native';
import EventList from '../components/EventList';
import { useEffect, useState } from 'react';
import { getEvents } from '../../fetching';
import { Event } from '../types/Event';

const PastEventsScreen = () => {
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(events => {
      const filtered =
        events?.filter((event: Event) => event.finishDate !== null) || [];
      setPastEvents(filtered);
    });
  }, []);

  return (
    <View style={styles.container}>
      <EventList events={pastEvents} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
};

export default PastEventsScreen;
