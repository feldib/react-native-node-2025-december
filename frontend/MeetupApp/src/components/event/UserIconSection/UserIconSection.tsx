import { StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import { User } from '@/types/db/User';
import { useTheme } from '@/theme/ThemeContext';

const UserIconSection = ({ users }: { users: User[] }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.userContainer}>
      {users.map(user => (
        <Text
          key={user.id}
          style={[
            styles.userInitial,
            { backgroundColor: colors.primary, color: colors.textInverse },
          ]}
        >
          {user.firstName.charAt(0).toUpperCase()}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  userInitial: {
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    marginRight: 5,
  },
});

export default UserIconSection;
