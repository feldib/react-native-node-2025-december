import { View } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useGetEventsQuery } from '@/store/api';
import { useTheme } from '@/theme/ThemeContext';
import { useMemo } from 'react';

const CurrentEventsScreen = () => {
  const { colors } = useTheme();
  const { data: events = [] } = useGetEventsQuery();

  const currentEvents = useMemo(() => {
    return events.filter(event => event.finishDate === null);
  }, [events]);

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
