import { ButtonHTMLAttributes } from 'react';

import MoreMenuButton from '../common/MoreMenuButton';
import CircleLine from '../common/CircleLine';
import RoundSquare from '../common/RoundSquare';

interface NotionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
}

export default function NotionItem({ content }: NotionItemProps) {
  return (
    <RoundSquare size="sm">
      <button className="w-[90%] flex flex-row items-center justify-between gap-2">
        <CircleLine amount={1} />
        <p className="w-full truncate text-left">{content}</p>
        <MoreMenuButton size="sm" />
      </button>
    </RoundSquare>
  );
}
