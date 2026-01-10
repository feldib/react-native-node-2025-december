import { UserEventStatus, useJoinEventMutation } from '@/store/api';
import { User } from '@/types/db/User';
import { useCallback, useMemo } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const useJoinButton = ({
  userEventStatus,
  eventId,
  user,
  refetchEvent,
  refetchStatus,
}: {
  userEventStatus: UserEventStatus | null | undefined;
  eventId: number;
  user: User | null;
  refetchEvent: () => void;
  refetchStatus: () => void;
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [joinEvent, { isLoading }] = useJoinEventMutation();

  const isCreator = useMemo(
    () => userEventStatus?.isCreator || false,
    [userEventStatus],
  );
  const hasRequestedToJoin = useMemo(
    () => userEventStatus?.hasRequestedToJoin || false,
    [userEventStatus],
  );
  const isApproved = useMemo(
    () => userEventStatus?.isApproved || false,
    [userEventStatus],
  );

  const buttonConfig = useMemo(() => {
    if (isCreator) {
      return {
        text: t('events.youAreCreator'),
        disabled: true,
        style: {
          backgroundColor: colors.buttonSecondary,
        },
      };
    }
    if (hasRequestedToJoin && isApproved) {
      return {
        text: t('events.joined'),
        disabled: true,
        style: { backgroundColor: colors.success },
      };
    }
    if (hasRequestedToJoin && !isApproved) {
      return {
        text: t('events.waitingApproval'),
        disabled: true,
        style: { backgroundColor: colors.warning },
      };
    }
    return {
      text: t('events.join'),
      disabled: isLoading,
      style: { backgroundColor: colors.accent },
    };
  }, [isCreator, hasRequestedToJoin, isApproved, isLoading, colors, t]);

  const handleJoin = useCallback(async () => {
    if (!user) return;

    try {
      await joinEvent({ eventId, userId: user.id }).unwrap();
      // Refetch data after successful join
      refetchEvent();
      refetchStatus();
    } catch (error) {
      console.error('Error joining event:', error);
    }
  }, [user, eventId, joinEvent, refetchEvent, refetchStatus]);

  return { buttonConfig, handleJoin };
};

export default useJoinButton;
