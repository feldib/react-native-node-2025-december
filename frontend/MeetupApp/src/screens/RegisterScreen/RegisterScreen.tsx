import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteKey, Routes } from '@/enums/routes';
import RegisterForm from '@/components/forms/RegisterForm/RegisterForm';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const RegisterScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

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
        {t('auth.createAccount')}
      </Text>

      <RegisterForm />

      <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
        <Text style={[styles.linkText, { color: colors.textLink }]}>
          {t('auth.alreadyHaveAccount')}
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
