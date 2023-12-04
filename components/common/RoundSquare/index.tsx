import { Size } from '@/types/style';
import { ReactNode } from 'react';

interface RoundSquareProps {
  children?: ReactNode;
  size?: Size | 'free';
}

const heightStyle: Record<Size | 'free', string> = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-40',
  free: 'h-fit',
};

export default function RoundSquare({
  children,
  size = 'md',
}: RoundSquareProps) {
  return (
    <div
      className={`bg-slate-100 hover:bg-slate-200 rounded-lg flex justify-center items-center flex-col ${heightStyle[size]}`}
    >
      {children}
    </div>
  );
}
