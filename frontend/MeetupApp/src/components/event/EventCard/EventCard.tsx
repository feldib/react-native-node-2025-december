import { StyleSheet, Text, Pressable } from 'react-native';
import { View } from 'react-native';
import { Event } from '@/types/db/Event';
import { useNavigation } from '@react-navigation/native';
import { getCategoryName, getCategoryIcon } from '@/helpers/categories';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RouteKey, Routes, DisplayedEventType } from '@/enums/routes';
import UserIconSection from '@/components/event/UserIconSection/UserIconSection';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const EventCard = ({
  event,
  eventType,
}: {
  event: Event;
  eventType: DisplayedEventType;
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const categoryIcon = getCategoryIcon(event.category);

  const handlePress = () => {
    navigation.navigate(Routes[RouteKey.EventDetail].name, {
      eventId: event.id,
      eventType,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View
        style={[
          styles.card,
          {
            borderColor: colors.primary,
            backgroundColor: colors.cardBackground,
          },
        ]}
      >
        <View style={styles.categoryHeader}>
          {categoryIcon && (
            <FontAwesomeIcon
              icon={categoryIcon as IconProp}
              size={20}
              color={colors.textSecondary}
            />
          )}
          <Text style={[styles.category, { color: colors.textSecondary }]}>
            {getCategoryName(event.category)}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.text }]}>{event.name}</Text>
        <Text style={{ color: colors.text }}>
          {t('events.startDate')}: {new Date(event.startDate).toLocaleString()}
        </Text>
        {event.finishDate !== null && (
          <Text style={{ color: colors.text }}>
            {t('events.finishDate')}:{' '}
            {new Date(event.finishDate).toLocaleString()}
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
  },
  category: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '500',
  },
});

export default EventCard;
