import { Text } from '@react-navigation/elements';
import { Controller, Control, FieldErrors, FieldValues } from 'react-hook-form';
import { StyleSheet, TextInput } from 'react-native';
import FormField from '../types/forms/FormField';

type InputFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<T>;
  formFields: FormField<T>[];
};

const InputFields = <T extends FieldValues>({
  control,
  errors,
  formFields,
}: InputFieldsProps<T>) => {
  return (
    <>
      {formFields.map(field => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                style={[styles.input, field.isTextArea && styles.textArea]}
                placeholder={field.placeholder}
                value={value?.toString() || ''}
                onChangeText={onChange}
                onBlur={onBlur}
                autoCapitalize={field.autoCapitalize}
                keyboardType={field.keyboardType}
                secureTextEntry={field.secureTextEntry}
                multiline={field.multiline}
                numberOfLines={field.numberOfLines}
              />
              {errors[field.name] && (
                <Text style={styles.fieldError}>
                  {String(errors[field.name]?.message)}
                </Text>
              )}
            </>
          )}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  fieldError: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 5,
  },
});

export default InputFields;
