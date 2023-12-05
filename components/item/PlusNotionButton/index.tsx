import { ButtonHTMLAttributes } from 'react';

import RoundSquare from '../../common/RoundSquare';

import { Size } from 'types/style';

interface PlusNotionButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: Size;
}

const sizeStyle: Record<Size, string> = {
  sm: 'text-xl font-medium',
  md: 'text-2xl font-semibold',
  lg: 'text-4xl font-medium',
};

export default function PlusNotionButton({
  size = 'sm',
  ...rest
}: PlusNotionButtonProps) {
  return (
    <RoundSquare size={size}>
      <button
        aria-label="더하기 버튼"
        className={`w-full ${sizeStyle[size]}`}
        {...rest}
      >
        +
      </button>
    </RoundSquare>
  );
}
