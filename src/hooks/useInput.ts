import React, { useState } from 'react';

type ChangeEvent = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>;

export type OnChange = (evt: ChangeEvent | string) => void;

type inputType = 'phone' | 'code' | 'common';

const useInput = (
  initialValue: string,
  maxLength: number,
  type: inputType = 'common',
  minLength: number = 0
): [string, OnChange] => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange: OnChange = (evt) => {
    const value = typeof evt === 'string' ? evt : evt.target.value;

    switch (type) {
      case 'common': {
        if (value.length <= maxLength) setValue(value);
        break;
      }
      case 'phone': {
        let valueForSetting = value.split('').map((el) => Number(el) || el === '0' ? el : '').join('');

        let changeable = !!((valueForSetting.length <= maxLength) && (Number(valueForSetting) || Number(valueForSetting) === 0));

        if (changeable) setValue(valueForSetting);
        break;
      }
      case 'code': {
        const regexp = new RegExp(/^(\+\d{0,4})$/);
        const changeable = regexp.test(value) && value.length >= minLength && value.length <= maxLength;
        if (changeable) setValue(value);
        break;
      }
      default: break;
    }
  }

  return [value, onChange];
};

export default useInput;
