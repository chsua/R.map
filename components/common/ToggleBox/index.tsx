'use client';
import React, { ReactNode } from 'react';

/**
 * children : 늘 존재하는 자식노드
 * toggleChildren: 감춰지는 자식노드
 */
interface ToggleBoxProps {
  isOpen: boolean;
  children: ReactNode;
  toggleChildren: ReactNode;
}

export default function ToggleBox({
  isOpen,
  children,
  toggleChildren,
}: ToggleBoxProps) {
  return (
    <div>
      {children}
      {isOpen && toggleChildren}
    </div>
  );
}
