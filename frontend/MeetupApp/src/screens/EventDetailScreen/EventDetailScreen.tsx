import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
} from 'react-native';
import { StaticScreenProps } from '@react-navigation/native';
import { useMemo } from 'react';
import { getCategoryIcon } from '@/helpers/categories';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useAuth } from '@/context/AuthContext';
import {
  useEventQuery,
  useUserEventStatusQuery,
} from '@/hooks/queries/useEvents';
import UserIconSection from '@/components/event/UserIconSection/UserIconSection';
import { DisplayedEventType } from '@/enums/routes';
import useJoinButton from './useJoinButton';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

type EventDetailScreenProps = StaticScreenProps<{
  eventId: number;
  eventType: DisplayedEventType;
}>;

const EventDetailScreen = ({ route }: EventDetailScreenProps) => {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user } = useAuth();
  const { eventId, eventType } = route.params;

  const { data: event, isLoading: eventLoading, error: eventError } = useEventQuery(eventId);

  const userStatusUserId = eventType === 'current' && user ? user.id : 0;
  const { data: userEventStatus, isLoading: statusLoading } =
    useUserEventStatusQuery(eventId, userStatusUserId);

  const finishDate = useMemo(() => {
    if (!event || !event.finishDate) return null;
    return new Date(event.finishDate);
  }, [event]);

  const { buttonConfig, handleJoin } = useJoinButton({
    userEventStatus,
    eventId,
    user,
  });

  if (eventLoading || (eventType === 'current' && statusLoading)) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (eventError) {
    return (
      <View style={styles.container}>
        <Text>Error loading event: {eventError.message || 'Please try again'}</Text>
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Event not found</Text>
      </View>
    );
  }

  const categoryIcon = getCategoryIcon(event.category);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View
        style={[
          styles.card,
          {
            borderColor: colors.textSecondary,
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
            {t(`categories.${event.category}`)}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.textTitle }]}>
          {event.name}
        </Text>
        <Text>Start Date: {new Date(event.startDate).toLocaleString()}</Text>
        {eventType === 'past' && finishDate && (
          <Text>Finish date: {finishDate.toLocaleString()}</Text>
        )}
        <UserIconSection users={event.users} />

        {eventType === 'current' ? (
          <TouchableOpacity
            style={[styles.button, buttonConfig.style]}
            disabled={buttonConfig.disabled}
            onPress={handleJoin}
          >
            <Text
              style={[styles.buttonText, { color: colors.buttonPrimaryText }]}
            >
              {buttonConfig.text}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  button: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventDetailScreen;
