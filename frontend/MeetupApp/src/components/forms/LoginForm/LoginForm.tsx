import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/authSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import loginSchema from '@/schemas/login';
import InputFields from '@/components/input/InputFields/InputFields';
import FormField from '@/types/forms/FormField';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from 'react-i18next';

type LoginFormData = yup.InferType<typeof loginSchema>;

const LoginForm = ({ isLoading }: { isLoading: boolean }) => {
  const { colors } = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
    await dispatch(login({ email: data.email, password: data.password }));
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
});

export default LoginForm;
