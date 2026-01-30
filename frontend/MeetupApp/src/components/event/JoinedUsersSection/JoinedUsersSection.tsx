import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { User } from '@/types/db/User';
import { useTheme } from '@/theme/ThemeContext';

const JoinedUsersSection = ({ users }: { users: User[] }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.userContainer}>
      {users.map(user => (
        <Text key={user.id} style={[styles.userName, { color: colors.text }]}>
          {`${user.firstName} ${user.lastName} (${user.age})`}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginTop: 10,
  },
  userName: {
    height: 30,
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default JoinedUsersSection;
