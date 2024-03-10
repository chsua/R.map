import { memo, useState } from 'react';

import { Size } from 'types/style';
import { TOAST_TIME } from '@components/context/toast';

import * as S from './style';

interface ToastProps {
  children: string;
  size: Size | 'free';
}

export default memo(function Toast({ children, size }: ToastProps) {
  const [isShown, setIsShown] = useState(true);

  const timeId = window.setTimeout(() => {
    window.clearTimeout(timeId);
    setIsShown(false);
  }, TOAST_TIME);

  return (
    <S.Content aria-live="polite" $size={size} $isShown={isShown}>
      {children}
    </S.Content>
  );
});
