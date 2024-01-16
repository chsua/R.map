import ModalWrapper, { ModalControlRef } from '@components/common/ModalWrapper';
import { useModalContext } from '@components/context/ModalContext';
import { useEffect, useRef, useState } from 'react';

let elementId = 1;

interface Options {
  exitOnUnmount?: boolean;
}

export type CreateModal = (props: {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}) => JSX.Element;

export const useModal = ({ exitOnUnmount }: Options = {}) => {
  const context = useModalContext();

  if (!context) throw alert('예기치 못한 컨텍스트 에러 발생');

  const { addModal, deleteModal } = context;
  const [id] = useState(() => elementId++);
  const modalRef = useRef<ModalControlRef | null>(null);

  useEffect(() => {
    return () => {
      if (exitOnUnmount) {
        deleteModal(id);
      }
    };
  }, [exitOnUnmount, id, deleteModal]);

  return {
    open: (modalComponent: CreateModal) =>
      addModal(
        id,
        <ModalWrapper
          key={Date.now()}
          ref={modalRef}
          modal={modalComponent}
          exit={() => deleteModal(id)}
        />,
      ),
    close: modalRef.current?.close,
    exit: () => deleteModal(id),
  };
};
