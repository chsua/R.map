import RoundSquare from '@components/common/RoundSquare';
import { NotionFolder } from 'types/notion';
import NotionItem from '../NotionItem';
import CircleLine from '@components/common/CircleLine';

interface NotionInfoProps {
  notion: NotionFolder;
  handleNotionItemClick?: () => void;
}

export default function NotionInfo({
  notion,
  handleNotionItemClick,
}: NotionInfoProps) {
  return (
    <div className="w-[90%] h-[90%] flex gap-5 flex-col m-auto">
      <NotionItem
        content={notion.name}
        handleNotionItemClick={handleNotionItemClick}
      />
      <button className="flex gap-3 items-center text-sm">
        <CircleLine amount={1} />
        <span>추후 폴더 합치기 버튼</span>
      </button>
      <button className="flex gap-3 items-center text-sm">
        <CircleLine amount={1} />
        <span>추후 폴더 삭제 버튼</span>
      </button>
    </div>
  );
}
