import {
  joinEvent as joinEventAction,
  UserEventStatus,
} from '@/store/eventsSlice';
import { User } from '@/types/db/User';
import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
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
        style: styles.creatorButton,
      };
    }
    if (hasRequestedToJoin && isApproved) {
      return {
        text: 'Joined',
        disabled: true,
        style: styles.joinedButton,
      };
    }
    if (hasRequestedToJoin && !isApproved) {
      return {
        text: 'Waiting for approval',
        disabled: true,
        style: styles.pendingButton,
      };
    }
    return {
      text: 'Join',
      disabled: false,
      style: styles.joinButton,
    };
  }, [isCreator, hasRequestedToJoin, isApproved]);

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

const styles = StyleSheet.create({
  joinButton: {
    backgroundColor: '#007AFF',
  },
  creatorButton: {
    backgroundColor: '#6c757d',
  },
  joinedButton: {
    backgroundColor: '#28a745',
  },
  pendingButton: {
    backgroundColor: '#ffc107',
  },
});

export default useJoinButton;
