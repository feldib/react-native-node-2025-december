import { View } from 'react-native';
import EventList from '../components/EventList';
import { getEvents } from '../fetching/fetching';
import { useEffect, useState } from 'react';
import { Event } from '../types/Event';

const CurrentEventsScreen = () => {
  const [currentEvents, setCurrentEvents] = useState<Event[]>([]);

  useEffect(() => {
    getEvents().then(events => {
      const filtered =
        events?.filter((event: Event) => event.finishDate === null) || [];
      setCurrentEvents(filtered);
    });
  }, []);

  return (
    <View style={styles.container}>
      <EventList events={currentEvents} />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
};

export default CurrentEventsScreen;
