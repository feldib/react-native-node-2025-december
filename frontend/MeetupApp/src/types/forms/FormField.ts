import { FieldValues, Path } from 'react-hook-form';
import { TextInputProps } from 'react-native';

type FormField<T extends FieldValues> = {
  name: Path<T>;
  placeholder: string;
  autoCapitalize?: TextInputProps['autoCapitalize'];
  keyboardType?: TextInputProps['keyboardType'];
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  isTextArea?: boolean;
};

export default FormField;
