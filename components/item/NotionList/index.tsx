import { notionList } from '@mocks/mockData/notionList';

import NotionItem from '../NotionItem';
import PlusNotionButton from '../PlusNotionButton';

interface NotionListProps {
  handlePlusButtonClick: () => void;
  handleMoreMenuButtonClick: () => void;
  handleNotionItemClick: () => void;
}

export default function NotionList({
  handlePlusButtonClick,
  handleMoreMenuButtonClick,
  handleNotionItemClick,
}: NotionListProps) {
  return (
    <ul className="flex gap-2 flex-col">
      {notionList.map((item) => {
        return (
          <li key={item.name}>
            <NotionItem
              content={item.name}
              handleMoreMenuButtonClick={handleMoreMenuButtonClick}
              handleNotionItemClick={handleNotionItemClick}
            />
          </li>
        );
      })}
      <li>
        <PlusNotionButton onClick={handlePlusButtonClick} />
      </li>
    </ul>
  );
}
