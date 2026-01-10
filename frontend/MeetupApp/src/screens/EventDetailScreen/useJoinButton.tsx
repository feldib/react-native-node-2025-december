import { UserEventStatus } from '@/types/UserEventStatus';
import { User } from '@/types/db/User';
import { useCallback, useMemo } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useJoinEventMutation } from '@/hooks/queries/useEvents';

const useJoinButton = ({
  userEventStatus,
  eventId,
  user,
}: {
  userEventStatus: UserEventStatus | null;
  eventId: number;
  user: User | null;
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const joinMutation = useJoinEventMutation();
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
      disabled: joinMutation.isPending,
      style: { backgroundColor: colors.accent },
    };
  }, [
    isCreator,
    hasRequestedToJoin,
    isApproved,
    colors,
    t,
    joinMutation.isPending,
  ]);

  const handleJoin = useCallback(async () => {
    if (!user) return;

    try {
      await joinMutation.mutateAsync({ eventId, userId: user.id });
    } catch (error) {
      console.error('Error joining event:', error);
    }
  }, [user, eventId, joinMutation]);

  return { buttonConfig, handleJoin };
};

export default useJoinButton;
