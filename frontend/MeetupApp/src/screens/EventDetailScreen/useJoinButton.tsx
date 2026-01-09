import {
  joinEvent as joinEventAction,
  UserEventStatus,
} from '@/store/eventsSlice';
import { User } from '@/types/db/User';
import { useCallback, useMemo } from 'react';
import { useTheme } from '@/theme/ThemeContext';
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
        text: "You're the creator",
        disabled: true,
        style: {
          backgroundColor: colors.buttonSecondary,
        },
      };
    }
    if (hasRequestedToJoin && isApproved) {
      return {
        text: 'Joined',
        disabled: true,
        style: { backgroundColor: colors.success },
      };
    }
    if (hasRequestedToJoin && !isApproved) {
      return {
        text: 'Waiting for approval',
        disabled: true,
        style: { backgroundColor: colors.warning },
      };
    }
    return {
      text: 'Join',
      disabled: false,
      style: { backgroundColor: colors.accent },
    };
  }, [isCreator, hasRequestedToJoin, isApproved, colors]);

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
