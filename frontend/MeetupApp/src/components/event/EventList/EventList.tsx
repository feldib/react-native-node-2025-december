import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Event } from '@/types/db/Event';
import { DisplayedEventType } from '@/enums/routes';
import EventCard from '@/components/event/EventCard/EventCard';

const EventList = ({
  events,
  eventType,
}: {
  events: Event[];
  eventType: DisplayedEventType;
}) => {
  return (
    <View style={styles.container}>
      {events.map(event => (
        <EventCard key={event.id} event={event} eventType={eventType} />
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
