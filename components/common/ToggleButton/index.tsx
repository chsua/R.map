'use client';
import { ButtonHTMLAttributes } from 'react';

interface ToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOpened: boolean;
}

const toggleNowOpen =
  'border-b-[10px] border-b-slate-500 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent w-0 h-0';
const toggleNowClose =
  'border-t-[10px] border-t-slate-500 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent w-0 h-0';

export default function ToggleButton({ isOpened, ...rest }: ToggleButtonProps) {
  return (
    <button
      aria-label={isOpened ? '현재 열려있음. 닫기.' : '현재 닫혀있음. 열기.'}
      {...rest}
    >
      <div className={isOpened ? toggleNowOpen : toggleNowClose} />
    </button>
  );
}
