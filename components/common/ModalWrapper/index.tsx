import { CreateModal } from 'hooks/useModal';
import {
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';

interface ModalWrapperProps {
  modal: CreateModal;
  exit: () => void;
}

export interface ModalControlRef {
  close: () => void;
}

export default forwardRef(function ModalWrapper(
  { modal: Modal, exit }: ModalWrapperProps,
  ref: Ref<ModalControlRef>,
) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return { close: () => setIsOpen(false) };
  });

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
  }, []);

  return <Modal isOpen={isOpen} close={() => setIsOpen(false)} exit={exit} />;
});
