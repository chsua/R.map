import NotionItem from '../NotionItem';
import PlusNotionButton from '../PlusNotionButton';

import { essenceNotion } from 'types/notion';

interface NotionListProps {
  style?: string;
  notionList: essenceNotion[];
  handlePlusButtonClick: () => void;
  handleMoreMenuButtonClick: () => void;
  handleNotionItemClick: (id: number) => void;
}

export default function NotionList({
  style = '',
  notionList,
  handlePlusButtonClick,
  handleMoreMenuButtonClick,
  handleNotionItemClick,
}: NotionListProps) {
  return (
    <ul className={`h-fit grid grid-cols-1 gap-3 items-start ${style}`}>
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
