import React from 'react';

import RadioInputField from '@/components/input/RadioInputField/RadioInputField';
import { render } from '@testing-library/react-native';

test('RadioInputField renders', async () => {
  const field = {
    name: 'gender',
    type: 'radio',
    placeholder: 'Gender',
    radioOptions: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  } as any;

  render(<RadioInputField field={field} value={'male'} onChange={() => {}} />);
});
