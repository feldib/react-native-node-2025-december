import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useJoinRequestsQuery } from '@/hooks/queries/useEvents';
import PendingApprovalLine from '../PendingApprovalLine/PendingApprovalLine';

interface PendingApprovalsProps {
  eventId: number;
  currentUserId: number;
}

const PendingApprovals = ({
  eventId,
  currentUserId,
}: PendingApprovalsProps) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { data: joinRequests, isLoading } = useJoinRequestsQuery(
    eventId,
    currentUserId,
  );

  if (isLoading) {
    return null;
  }

  if (!joinRequests || joinRequests.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, { borderColor: colors.textSecondary }]}>
      <Text style={[styles.title, { color: colors.textTitle }]}>
        {t('events.pendingApprovals')}
      </Text>

      {joinRequests.map((request: any) => {
        const hasVoted = request.currentUserApprovalStatus !== null;
        const userVote = request.currentUserApprovalStatus;

        return (
          <PendingApprovalLine
            key={request.targetUser.id}
            hasVoted={hasVoted}
            userVote={userVote}
            request={request}
            eventId={eventId}
            currentUserId={currentUserId}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default PendingApprovals;
