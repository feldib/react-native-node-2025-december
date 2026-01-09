import { View } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchEvents } from '@/store/eventsSlice';
import { useTheme } from '@/theme/ThemeContext';

const CurrentEventsScreen = () => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { currentEvents } = useAppSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
