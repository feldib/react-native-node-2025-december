import { View } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchEvents } from '@/store/eventsSlice';

const CurrentEventsScreen = () => {
  const dispatch = useAppDispatch();
  const { currentEvents } = useAppSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
