import { EssentialNotion } from 'types/notion';
import NotionItem from '../NotionItem';
import { ReactNode } from 'react';

interface NotionInfoProps {
  notion: EssentialNotion;
  handleNotionItemClick?: () => void;
  children?: ReactNode;
}

export default function NotionInfo({
  notion,
  handleNotionItemClick,
  children,
}: NotionInfoProps) {
  return (
    <div className="w-[90%] h-[90%] flex gap-5 flex-col m-auto">
      <NotionItem
        content={notion.name}
        handleNotionItemClick={handleNotionItemClick}
      />
      {children}
    </div>
  );
}
