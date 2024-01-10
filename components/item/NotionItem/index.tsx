import { ButtonHTMLAttributes, MouseEventHandler } from 'react';

import MoreMenuButton from '../../common/MoreMenuButton';
import CircleLine from '../../common/CircleLine';
import RoundSquare from '../../common/RoundSquare';

interface NotionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  handleNotionItemClick?: () => void;
  handleMoreMenuButtonClick?: () => void;
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
    handleMoreMenuButtonClick && handleMoreMenuButtonClick();
  };

  return (
    <RoundSquare size="sm">
      <div className="w-[90%] flex flex-row items-center justify-between gap-2">
        <CircleLine amount={1} />
        {handleNotionItemClick ? (
          <button
            className="w-full truncate text-left"
            onClick={handleNotionItemClick}
          >
            {content}
          </button>
        ) : (
          <p className="w-full truncate">{content}</p>
        )}
        {handleMoreMenuButtonClick && (
          <MoreMenuButton
            size="sm"
            onClick={handleMoreNotionButtonClickWithoutBubbling}
          />
        )}
      </div>
    </RoundSquare>
  );
}
