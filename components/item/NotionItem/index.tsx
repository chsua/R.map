import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import MoreMenuButton from '../../common/MoreMenuButton';
import CircleLine from '../../common/CircleLine';
import RoundSquare from '../../common/RoundSquare';

interface NotionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  handleNotionItemClick: () => void;
  handleMoreMenuButtonClick: () => void;
}

export default function NotionItem({
  content,
  handleNotionItemClick,
  handleMoreMenuButtonClick,
}: NotionItemProps) {
  const handleMoreNotionButtonClickWithoutBubbling: MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.stopPropagation();
    handleMoreMenuButtonClick();
  };

  return (
    <RoundSquare size="sm">
      <button
        className="w-[90%] flex flex-row items-center justify-between gap-2"
        onClick={handleNotionItemClick}
      >
        <CircleLine amount={1} />
        <p className="w-full truncate text-left">{content}</p>
        <MoreMenuButton
          size="sm"
          onClick={handleMoreNotionButtonClickWithoutBubbling}
        />
      </button>
    </RoundSquare>
  );
}
