import { useModal } from 'hooks/useModal';
import NotionItem from '../NotionItem';
import PlusNotionButton from '../PlusNotionButton';

import { EssenceNotion } from 'types/notion';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '../NotionForm';
import { useRouter } from 'next/navigation';

interface NotionListProps {
  style?: string;
  notionList: EssenceNotion[];
  handleNotionItemClick: (id: number) => void;
}

export default function NotionList({
  style = '',
  notionList,
  handleNotionItemClick,
}: NotionListProps) {
  const router = useRouter();

  const { open: openMoreButtonBottomSheet, exit: exitMoreButtonBottomSheet } =
    useModal();
  const openBottomSheetForNotion = () => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitMoreButtonBottomSheet()}>
        여기에 노션 정보
      </BottomSheet>
    ));
  };

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotionSubmit = () => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <NotionForm
          type="make"
          subEvent={() => {
            router.refresh();
            exitSubmitButtonBottomSheet();
          }}
        />
      </BottomSheet>
    ));
  };

  return (
    <ul className={`h-fit grid grid-cols-1 gap-3 items-start ${style}`}>
      {notionList.map((item) => {
        return (
          <li key={item.name}>
            <NotionItem
              content={item.name}
              handleMoreMenuButtonClick={openBottomSheetForNotion}
              handleNotionItemClick={() => handleNotionItemClick(item.id)}
            />
          </li>
        );
      })}
      <li>
        <PlusNotionButton onClick={openBottomSheetForNotionSubmit} />
      </li>
    </ul>
  );
}
