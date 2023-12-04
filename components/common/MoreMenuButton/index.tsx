import { Size } from '@/types/style';
import { ButtonHTMLAttributes } from 'react';

interface MoreMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction?: 'row' | 'column';
  size?: Size;
}

const circleStyle: Record<Size, string> = {
  sm: 'w-1.5 h-1.5 m-0.5',
  md: 'w-2 h-2 m-0.5',
  lg: 'w-2.5 h-2.5 m-1',
};

export default function MoreMenuButton({
  direction = 'row',
  size = 'md',
  ...rest
}: MoreMenuButtonProps) {
  return (
    <button
      {...rest}
      aria-label="더보기 메뉴"
      className={`w-fit h-fit flex justify-center items-center ${
        direction === 'row' ? 'flex-row' : 'flex-col'
      }`}
    >
      <div className={`${circleStyle[size]} bg-slate-400 rounded-full `} />
      <div className={`${circleStyle[size]} bg-slate-400 rounded-full `} />
      <div className={`${circleStyle[size]} bg-slate-400 rounded-full `} />
    </button>
  );
}
