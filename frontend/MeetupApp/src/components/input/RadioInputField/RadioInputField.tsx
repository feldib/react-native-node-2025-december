import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { FieldValues } from 'react-hook-form';
import FormField, { RadioFormField } from '@/types/forms/FormField';
import { useTheme } from '@/theme/ThemeContext';

type RadioInputFieldProps<T extends FieldValues> = {
  field: FormField<T>;
  errorMessage?: string;
  value: any;
  onChange: (value: any) => void;
};

const RadioInputField = <T extends FieldValues>({
  field,
  errorMessage,
  value,
  onChange,
}: RadioInputFieldProps<T>) => {
  const { colors } = useTheme();
  return (
    <View style={styles.radioButtonGroupContainer}>
      {(field as RadioFormField<T>).radioOptions.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButton}
          onPress={() => onChange(option.value)}
        >
          <View style={[styles.radioCircle, { borderColor: colors.primary }]}>
            {value === option.value && (
              <View
                style={[styles.selectedRb, { backgroundColor: colors.primary }]}
              />
            )}
          </View>
          <Text style={[styles.radioText, { color: colors.text }]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
      {errorMessage && (
        <Text style={[styles.fieldError, { color: colors.textError }]}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fieldError: {
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  radioButtonGroupContainer: {
    marginBottom: 15,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioInputField;
