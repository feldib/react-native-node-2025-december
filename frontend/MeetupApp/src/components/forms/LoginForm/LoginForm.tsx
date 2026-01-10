import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useLoginMutation } from '@/store/api';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import loginSchema from '@/schemas/login';
import InputFields from '@/components/input/InputFields/InputFields';
import FormField from '@/types/forms/FormField';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginForm = () => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const [login, { isLoading }] = useLoginMutation();
  const [hasError, setHasError] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email, password: data.password }).unwrap();
      setHasError(false);
    } catch (error) {
      console.error('Login failed:', error);
      setHasError(true);
    }
  };

  const formFields: FormField<LoginFormData>[] = [
    {
      name: 'email' as const,
      type: 'email',
      placeholder: t('auth.email'),
    },
    {
      name: 'password' as const,
      type: 'password',
      placeholder: t('auth.password'),
    },
  ];

  return (
    <>
      {hasError && (
        <Text style={[styles.error, { color: colors.textError }]}>
          {t('auth.loginError')}
        </Text>
      )}

      <InputFields control={control} errors={errors} formFields={formFields} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.buttonPrimary }]}
        onPress={handleSubmit(onSubmit)}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color={colors.buttonPrimaryText} />
        ) : (
          <Text
            style={[styles.buttonText, { color: colors.buttonPrimaryText }]}
          >
            {t('auth.login')}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    marginBottom: 15,
    fontSize: 14,
  },
});

export default LoginForm;
