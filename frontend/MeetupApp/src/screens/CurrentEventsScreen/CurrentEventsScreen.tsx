import { View, ActivityIndicator } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useEventsQuery } from '@/hooks/queries/useEvents';
import { useTheme } from '@/theme/ThemeContext';
import { Event } from '@/types/db/Event';

const CurrentEventsScreen = () => {
  const { colors } = useTheme();
  const { data: events = [], isLoading } = useEventsQuery();

  // Filter for current events (finishDate === null)
  const currentEvents = events.filter(
    (event: Event) => event.finishDate === null,
  );

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <EventList events={currentEvents} eventType="current" />
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
