import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppSelector } from '@/store/hooks';
import { RouteKey, Routes } from '@/enums/routes';
import { LoggedOutStackParamList } from '@/components/navigation/LoggedOutNavigation/LoggedOutNavigation';
import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { useTheme } from '@/theme/ThemeContext';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const { isLoading, error } = useAppSelector(state => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<LoggedOutStackParamList>>();

  const handlePress = () => {
    navigation.navigate(Routes[RouteKey.Login].name);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.title, { color: colors.textTitle }]}>
        Create Account
      </Text>

      {error && (
        <Text style={[styles.error, { color: colors.textError }]}>{error}</Text>
      )}

      <RegisterForm isLoading={isLoading} />

      <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
        <Text style={[styles.linkText, { color: colors.textLink }]}>
          Already have an account? Login
        </Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
  error: {
    marginBottom: 15,
    fontSize: 14,
  },
});

export default RegisterScreen;
