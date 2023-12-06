'use client';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { mockNotionBanana, mockNotionBear } from '@mocks/mockData/notionList';
import { useBottomSheetContent } from 'hooks/useBottomSheetContent';
import { useMovePage } from 'hooks/useMovePage';

export default function Home() {
  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useBottomSheetContent();

  const { moveNotionItemPage } = useMovePage();

  return (
    <main className="flex flex-col gap-5">
      <Title content="개념" />
      <CircleLine amount={8} />
      <NotionList
        notionList={[
          ...mockNotionBear.relatedNotionList,
          ...mockNotionBanana.relatedNotionList,
        ]}
        handlePlusButtonClick={handlePlusButtonClick}
        handleMoreMenuButtonClick={handleMoreMenuButtonClick}
        handleNotionItemClick={moveNotionItemPage}
      />
      {bottomSheetComponent}
    </main>
  );
}
