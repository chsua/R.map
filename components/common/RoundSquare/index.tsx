import { Size } from '@/types/style';
import { ReactNode } from 'react';

interface RoundSquareProps {
  children?: ReactNode;
  size?: Size;
}

const heightStyle: Record<Size, string> = {
  sm: 'h-12',
  md: 'h-16',
  lg: 'h-20',
};

export default function RoundSquare({
  children,
  size = 'md',
}: RoundSquareProps) {
  return (
    <div
      className={`bg-slate-100 hover:bg-slate-200 rounded-lg flex justify-center items-center flex-col h- ${heightStyle[size]}`}
    >
      {children}
    </div>
  );
}
