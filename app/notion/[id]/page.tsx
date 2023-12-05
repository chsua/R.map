'use client';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';

import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { mockNotionBanana } from '@mocks/mockData/notionList';

import { useBottomSheetContent } from 'hooks/useBottomSheetContent';
import { useMovePage } from 'hooks/useMovePage';

export default function play({ params }: { params: { id: number } }) {
  const { addNotionItem } = useRecentlyNotionContext();
  const { moveNotionItemPage } = useMovePage();

  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useBottomSheetContent();

  //추후 fetch한 데이터로 수정
  const { id, name, description, relatedNotionList } = mockNotionBanana;

  const handleNotionItemClick = () => (id: number) => {
    addNotionItem({ id, name });
    moveNotionItemPage(id);
  };

  return (
    <main className="flex flex-col gap-5">
      <Title content={name} />
      <CircleLine amount={8} />
      <Description content={description} />
      <NotionList
        notionList={relatedNotionList}
        handlePlusButtonClick={handlePlusButtonClick}
        handleMoreMenuButtonClick={handleMoreMenuButtonClick}
        handleNotionItemClick={() => handleNotionItemClick()}
      />
      {bottomSheetComponent}
    </main>
  );
}
