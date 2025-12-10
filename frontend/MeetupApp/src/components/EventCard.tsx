import { StyleSheet, Text, Pressable } from 'react-native';
import { View } from 'react-native';
import { Event } from '../types/Event';
import { useNavigation } from '@react-navigation/native';
import { getCategoryName } from '../helpers/categories';

const EventCard = ({ event }: { event: Event }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // @ts-ignore - navigation types
    navigation.navigate('EventDetail', { eventId: event.id });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <Text style={styles.title}>{event.name}</Text>
        <Text style={styles.category}>{getCategoryName(event.category)}</Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {event.finishDate !== null && (
          <Text>
            Finish date: {new Date(event.finishDate).toLocaleString()}
          </Text>
        )}
        <Text>Users: {event.users.length}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#3f5eadff',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3f5eadff',
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    color: '#6c7899ff',
  },
});

export default EventCard;
