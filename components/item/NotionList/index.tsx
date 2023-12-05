import { notionList } from '@mocks/mockData/notionList';

import NotionItem from '../NotionItem';
import PlusNotionButton from '../PlusNotionButton';

interface NotionListProps {
  handlePlusButtonClick: () => void;
  handleMoreMenuButtonClick: () => void;
  handleNotionItemClick: (id: number) => void;
}

export default function NotionList({
  handlePlusButtonClick,
  handleMoreMenuButtonClick,
  handleNotionItemClick,
}: NotionListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {notionList.map((item) => {
        return (
          <li key={item.name}>
            <NotionItem
              content={item.name}
              handleMoreMenuButtonClick={handleMoreMenuButtonClick}
              handleNotionItemClick={() => handleNotionItemClick(item.id)}
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
