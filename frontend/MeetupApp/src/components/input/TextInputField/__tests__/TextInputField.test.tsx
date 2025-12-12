import React from 'react';

import TextInputField from '@/components/input/TextInputField/TextInputField';
import { render } from '@testing-library/react-native';

test('TextInputField renders', async () => {
  const field = {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
  } as any;

  render(
    <TextInputField
      field={field}
      value={''}
      onChange={() => {}}
      onBlur={() => {}}
    />,
  );
});
