import { useKeyEscClose } from 'hooks/useKeyEscClose';
import { MouseEventHandler, ReactNode } from 'react';
import { Size } from 'types/style';

interface BottomSheetProps {
  children?: ReactNode;
  size?: Size;
  closeEvent: () => void;
}

const heightStyle: Record<Size, string> = {
  sm: 'min-h-[40%]',
  md: 'min-h-[50%]',
  lg: 'min-h-[60%]',
};

export default function BottomSheet({
  children,
  size = 'md',
  closeEvent,
}: BottomSheetProps) {
  const closeModalKeyboardEvent = useKeyEscClose(closeEvent);

  const closeModalClickEvent: MouseEventHandler<
    HTMLDivElement | HTMLButtonElement
  > = (event) => {
    const target = event.target as HTMLElement;

    if (
      target.id === 'bottom-sheet-backdrop' ||
      target.id === 'bottom-sheet-close-button'
    )
      closeEvent();
  };

  return (
    <div
      id="bottom-sheet-backdrop"
      className="fixed inset-0 bg-black/30 z-10 flex justify-center items-end"
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
        className={`bg-white z-20 flex justify-center items-center flex-col ${heightStyle[size]} w-full max-w-[1000px] rounded-t-lg`}
      >
        {children}
      </div>
    </div>
  );
}
