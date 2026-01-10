import { View } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useGetEventsQuery } from '@/store/api';
import { useTheme } from '@/theme/ThemeContext';
import { useMemo } from 'react';

const PastEventsScreen = () => {
  const { colors } = useTheme();
  const { data: events = [] } = useGetEventsQuery();

  const pastEvents = useMemo(() => {
    return events.filter(event => event.finishDate !== null);
  }, [events]);

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
