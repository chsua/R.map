import React, { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  isChecked: boolean;
}

export default function Checkbox({ isChecked, ...rest }: CheckboxProps) {
  return <input type="checkbox" checked={isChecked} {...rest} />;
}
