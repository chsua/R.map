'use client';

import { useState } from 'react';

export default function Description({ content }: { content: string }) {
  const [isNowBlur, setIsNowBlur] = useState(false);

  const toggleBlur = () => {
    setIsNowBlur(!isNowBlur);
  };

  return (
    <div
      className={`${
        isNowBlur ? 'blur-sm' : ''
      } cursor-pointer flex flex-col gap-3`}
      onClick={toggleBlur}
    >
      {content.split('\n').map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
