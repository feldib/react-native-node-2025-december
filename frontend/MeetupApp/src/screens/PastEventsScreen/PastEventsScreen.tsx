import { View, ActivityIndicator } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useEventsQuery } from '@/hooks/queries/useEvents';
import { useTheme } from '@/theme/ThemeContext';
import { Event } from '@/types/db/Event';

const PastEventsScreen = () => {
  const { colors } = useTheme();
  const { data: events = [], isLoading } = useEventsQuery();

  // Filter for past events (finishDate !== null)
  const pastEvents = events.filter((event: Event) => event.finishDate !== null);

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EventList events={pastEvents} eventType="past" />
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
