import { ReactNode } from 'react';
import { Size, Color } from 'types/style';

interface RoundSquareProps {
  children?: ReactNode;
  size?: Size | 'free';
  color?: Color;
}

const heightStyle: Record<Size | 'free', string> = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-40',
  free: 'h-fit',
};

const colorInfo: Record<Color, string> = {
  default: 'bg-slate-100 hover:bg-slate-200',
  blue: 'bg-blue-300 hover:bg-blue-400',
};

export default function RoundSquare({
  children,
  size = 'md',
  color = 'default',
}: RoundSquareProps) {
  return (
    <div
      className={`${colorInfo[color]} rounded-lg flex justify-center items-center flex-col ${heightStyle[size]}`}
    >
      {children}
    </div>
  );
}
