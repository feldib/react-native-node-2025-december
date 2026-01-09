import {
  joinEvent as joinEventAction,
  UserEventStatus,
} from '@/store/eventsSlice';
import { User } from '@/types/db/User';
import { useCallback, useMemo } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from '@/store/store';

const useJoinButton = ({
  userEventStatus,
  eventId,
  user,
  dispatch,
}: {
  userEventStatus: UserEventStatus | null;
  eventId: number;
  user: User | null;
  dispatch: AppDispatch;
}) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
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
      disabled: false,
      style: { backgroundColor: colors.accent },
    };
  }, [isCreator, hasRequestedToJoin, isApproved, colors, t]);

  const handleJoin = useCallback(async () => {
    if (!user) return;

    try {
      await dispatch(joinEventAction({ eventId, userId: user.id })).unwrap();
    } catch (error) {
      console.error('Error joining event:', error);
    }
  }, [user, eventId, dispatch]);

  return { buttonConfig, handleJoin };
};

export default useJoinButton;
