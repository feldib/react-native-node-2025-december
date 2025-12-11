import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';
import { RouteKey, Routes } from '../enums/routes';
import LoginForm from '../components/LoginForm';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const { isLoading, error } = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const handlePress = () => {
    // @ts-ignore - navigation types
    navigation.navigate(Routes[RouteKey.Register].name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <LoginForm isLoading={isLoading} />

      <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#3f5eadff',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#3f5eadff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
