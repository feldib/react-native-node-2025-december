import { StyleSheet, Text, Pressable } from 'react-native';
import { View } from 'react-native';
import { Event } from '@/types/db/Event';
import { useNavigation } from '@react-navigation/native';
import { getCategoryName, getCategoryIcon } from '@/helpers/categories';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouteKey, Routes } from '@/enums/routes';
import UserIconSection from '@/components/event/UserIconSection/UserIconSection';

const EventCard = ({ event }: { event: Event }) => {
  const navigation = useNavigation();
  const categoryIcon = getCategoryIcon(event.category);

  const handlePress = () => {
    // @ts-ignore - navigation types
    navigation.navigate(Routes[RouteKey.EventDetail].name, {
      eventId: event.id,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.card}>
        <View style={styles.categoryHeader}>
          {categoryIcon && (
            <FontAwesomeIcon
              icon={categoryIcon as IconProp}
              size={20}
              color="#6c7899ff"
            />
          )}
          <Text style={styles.category}>{getCategoryName(event.category)}</Text>
        </View>
        <Text style={styles.title}>{event.name}</Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {event.finishDate !== null && (
          <Text>
            Finish date: {new Date(event.finishDate).toLocaleString()}
          </Text>
        )}
        <UserIconSection users={event.users} />
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
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
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
    color: '#6c7899ff',
  },
});

export default EventCard;
