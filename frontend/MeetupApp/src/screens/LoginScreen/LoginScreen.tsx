import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from '@/store/hooks';
import { RouteKey, Routes } from '@/enums/routes';
import LoginForm from '@/components/forms/LoginForm/LoginForm';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const { isLoading, error: loginError } = useAppSelector(state => state.auth);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(Routes[RouteKey.Register].name);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.textTitle }]}>
        {t('auth.login')}
      </Text>

      <LoginForm isLoading={isLoading} hasError={!!loginError} />

      <TouchableOpacity style={styles.linkButton} onPress={handlePress}>
        <Text style={[styles.linkText, { color: colors.textLink }]}>
          {t('auth.dontHaveAccount')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 16,
  },
});

export default LoginScreen;
