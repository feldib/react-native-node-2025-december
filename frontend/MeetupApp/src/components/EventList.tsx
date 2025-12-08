import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Event } from '../types/Event';
import EventCard from './EventCard';

const EventList = ({ events }: { events: Event[] }) => {
  return (
    <View style={styles.container}>
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventList;
