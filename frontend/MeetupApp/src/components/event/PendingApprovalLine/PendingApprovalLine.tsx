import { useSetJoinRequestMutation } from '@/hooks/queries/useEvents';
import { useTheme } from '@/theme/ThemeContext';
import { ApprovalStatus } from '@/types/approval/approval';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PendingApprovalLine({
  request,
  hasVoted,
  userVote,
  eventId,
  currentUserId,
}: {
  request: any;
  hasVoted: boolean;
  userVote: ApprovalStatus;
  eventId: number;
  currentUserId: number;
}) {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const setJoinRequestMutation = useSetJoinRequestMutation();

  const handleApprove = async (targetUserId: number) => {
    try {
      await setJoinRequestMutation.mutateAsync({
        eventId,
        approverUserId: currentUserId,
        targetUserId,
        status: 'approved',
      });
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  const handleReject = async (targetUserId: number) => {
    try {
      await setJoinRequestMutation.mutateAsync({
        eventId,
        approverUserId: currentUserId,
        targetUserId,
        status: 'rejected',
      });
    } catch (error) {
      console.error('Error rejecting user:', error);
    }
  };
  return (
    <View
      key={request.targetUser.id}
      style={[styles.requestItem, { backgroundColor: colors.cardBackground }]}
    >
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: colors.text }]}>
          {request.targetUser.firstName} {request.targetUser.lastName} (
          {request.targetUser.age})
        </Text>
        <Text style={[styles.approvalCount, { color: colors.textSecondary }]}>
          {request.currentApprovals}/{request.totalNecessaryApprovals}
        </Text>
      </View>

      <View style={styles.buttons}>
        {!hasVoted || userVote === 'pending' ? (
          <>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.success }]}
              onPress={() => handleApprove(request.targetUser.id)}
              disabled={setJoinRequestMutation.isPending}
            >
              <Text style={[styles.buttonText, { color: colors.textInverse }]}>
                ✓
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.error }]}
              onPress={() => handleReject(request.targetUser.id)}
              disabled={setJoinRequestMutation.isPending}
            >
              <Text style={[styles.buttonText, { color: colors.textInverse }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text
            style={[
              styles.votedText,
              {
                color: userVote === 'approved' ? colors.success : colors.error,
              },
            ]}
          >
            {userVote === 'approved'
              ? t('events.youApproved')
              : t('events.youRejected')}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  requestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  approvalCount: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  votedText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
