import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { RouteKey, Routes } from '@/enums/routes';
import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const { isLoading, error } = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const handlePress = () => {
    // @ts-ignore - navigation types
    navigation.navigate(Routes[RouteKey.Login].name);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      <RegisterForm isLoading={isLoading} />

      <TouchableOpacity onPress={handlePress}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  link: {
    color: '#007AFF',
    marginTop: 15,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 15,
    fontSize: 14,
  },
  fieldError: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default RegisterScreen;
