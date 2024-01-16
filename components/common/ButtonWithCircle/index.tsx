import React from 'react';
import CircleLine from '../CircleLine';

interface ButtonWithCircleProps {
  handleButtonClick: () => void;
  text: string;
}

export default function ButtonWithCircle({
  handleButtonClick,
  text,
}: ButtonWithCircleProps) {
  return (
    <button
      className="flex gap-3 items-center text-sm truncate"
      onClick={handleButtonClick}
    >
      <CircleLine amount={1} />
      <span>{text}</span>
    </button>
  );
}
