import { StyleSheet, FlatList } from 'react-native';
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
    <FlatList
      data={events}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => (
        <EventCard event={item} eventType={eventType} />
      )}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default EventList;
