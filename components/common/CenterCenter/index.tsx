import React, { ReactNode } from 'react';

export default function CenterCenter({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}) {
  return (
    <div className={`flex justify-center items-center ${style} `}>
      {children}
    </div>
  );
}
