'use client';

import { useState } from 'react';

export default function Description({ content }: { content: string }) {
  const [isNowBlur, setIsNowBlur] = useState(true);

  const toggleBlur = () => {
    setIsNowBlur(!isNowBlur);
  };

  return (
    <div
      className={`${isNowBlur ? 'blur-sm' : ''} cursor-pointer`}
      onClick={toggleBlur}
    >
      {content.split('\n').map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
