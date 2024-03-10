import { memo, useState } from 'react';

import { Size } from 'types/style';
import { TOAST_TIME } from '@components/context/toast';

interface ToastProps {
  children: string;
  size: Size | 'free';
}

const animation = {
  fadeIn: 'animate-[fadeIn_0.3s_ease-in-out_forwards]',
  fadeOut: 'animate-[fadeOut_0.3s_ease-in-out_forwards]',
};

const isShownStyle = {
  true: 'flex align-middle justify-center',
  false: 'hidden',
};

const sizeStyle: Record<Size | 'free', string> = {
  sm: 'h-10',
  md: 'h-10',
  lg: 'h-11',
  free: 'h-12',
};

export default memo(function Toast({ children, size }: ToastProps) {
  const [isShown, setIsShown] = useState(true);

  const timeId = window.setTimeout(() => {
    window.clearTimeout(timeId);
    setIsShown(false);
  }, TOAST_TIME);

  return (
    <div
      className={`rounded-md px-4 py-2 bg-[rgba(0,0,0,0.6)] text-white text-sm w-3/4 md:w-2/4  m-auto flex items-center
      ${isShownStyle[String(isShown) as 'true' | 'false']} 
      ${animation[isShown ? 'fadeIn' : 'fadeOut']} 
      ${sizeStyle[size]}`}
      aria-live="polite"
    >
      {children}
    </div>
  );
});
