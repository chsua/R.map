import { ReactNode } from 'react';

interface RoundSquareProps {
  children?: ReactNode;
}

export default function RoundSquare({ children }: RoundSquareProps) {
  return (
    <div className="bg-slate-100 hover:bg-slate-200 rounded-lg h-20 flex justify-center items-center flex-col">
      {children}
    </div>
  );
}
