'use client';
import React, {
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { ToggleControlRef } from 'types/etc';

/**
 * children : 늘 존재하는 자식노드
 * toggleChildren: 감춰지는 자식노드
 */
interface ToggleBoxProps {
  children: ReactNode;
  toggleChildren: ReactNode;
}

export default forwardRef(function ToggleBox(
  { children, toggleChildren }: ToggleBoxProps,
  ref: Ref<ToggleControlRef>,
) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      toggle: () => setIsOpen((isOpen) => !isOpen),
    };
  });

  return (
    <div>
      {children}
      {isOpen && toggleChildren}
    </div>
  );
});
