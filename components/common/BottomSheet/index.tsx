'use client';

import { useKeyEscClose } from 'hooks/useKeyEscClose';
import { MouseEventHandler, ReactNode, useEffect, useState } from 'react';
import { Size } from 'types/style';

interface BottomSheetProps {
  children?: ReactNode;
  size?: Size | 'free';
  closeEvent: () => void;
}

const heightStyle: Record<Size | 'free', string> = {
  sm: 'min-h-[40%]',
  md: 'min-h-[50%]',
  lg: 'min-h-[60%]',
  free: 'min-h-fit',
};

const animation = {
  open: 'animate-[bottomUp_0.35s_ease-in-out_forwards]',
  close: 'animate-[bottomDown_0.35s_ease-in-out_forwards]',
  fadeIn: 'animate-[fadeIn_0.35s_ease-in-out_forwards]',
  fadeOut: 'animate-[fadeOut_0.35s_ease-in-out_forwards]',
};

export default function BottomSheet({
  children,
  size = 'md',
  closeEvent,
}: BottomSheetProps) {
  const [isOpen, setIsOpen] = useState(true);
  const closeModalKeyboardEvent = useKeyEscClose(closeEvent);
  let timeId = 0;

  const closeModalClickEvent: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    const target = event.target as HTMLElement;

    if (
      target.id === 'bottom-sheet-backdrop' ||
      target.id === 'bottom-sheet-close-button'
    ) {
      setIsOpen(false);

      timeId = window.setTimeout(() => {
        closeEvent();
      }, 350);
    }
  };

  useEffect(() => {
    return () => clearTimeout(timeId);
  }, []);

  return (
    <div
      id="bottom-sheet-backdrop"
      className={`fixed inset-0 bg-black/30 z-10 flex justify-center items-end ${
        isOpen ? animation.fadeIn : animation.fadeOut
      }`}
      onClick={closeModalClickEvent}
      onKeyUp={() => closeModalKeyboardEvent}
      aria-label="모달"
    >
      <button
        id="bottom-sheet-close-button"
        aria-label="모달 닫기 버튼"
        onClick={closeModalClickEvent}
      />
      <div
        role="region"
        aria-label="모달 내 컨텐츠"
        className={`bg-white z-20 flex justify-center items-center flex-col ${
          heightStyle[size]
        } w-full max-w-[1000px] rounded-t-lg ${
          isOpen ? animation.open : animation.close
        }`}
      >
        {children}
      </div>
    </div>
  );
}
