import { ButtonHTMLAttributes, MouseEventHandler, useState } from 'react';

import MoreMenuButton from '../../common/MoreMenuButton';
import CircleLine from '../../common/CircleLine';
import RoundSquare from '../../common/RoundSquare';
import ToggleButton from '@components/common/ToggleButton';

interface NotionItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  handleNotionItemClick?: () => void;
  handleMoreMenuButtonClick?: () => void;
  handleToggleButtonClick?: () => void;
}

export default function NotionItem({
  content,
  handleNotionItemClick,
  handleMoreMenuButtonClick,
  handleToggleButtonClick,
}: NotionItemProps) {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const handleMoreNotionButtonClickWithoutBubbling: MouseEventHandler<
    HTMLButtonElement
  > = (event) => {
    event.stopPropagation();
    handleMoreMenuButtonClick && handleMoreMenuButtonClick();
  };

  return (
    <RoundSquare size="sm">
      <div className="w-[90%] flex flex-row items-center justify-between gap-2">
        {handleToggleButtonClick ? (
          <ToggleButton
            isOpened={isToggleOpen}
            onClick={() => {
              setIsToggleOpen((prev) => !prev);
              handleToggleButtonClick();
            }}
          />
        ) : (
          <CircleLine amount={1} />
        )}
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
