import { View } from 'react-native';
import EventList from '@/components/event/EventList/EventList';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchEvents } from '@/store/eventsSlice';

const PastEventsScreen = () => {
  const dispatch = useAppDispatch();
  const { pastEvents } = useAppSelector(state => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <View style={styles.container}>
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
