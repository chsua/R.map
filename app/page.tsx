'use client';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { mockNotionBear, mockNotionSnowWhite } from '@mocks/mockData/notion';
import { useNotionItemBottomSheet } from 'hooks/useNotionItemBottomSheet';
import { useMovePage } from 'hooks/useMovePage';

export default function Home() {
  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useNotionItemBottomSheet('make');

  const { moveNotionItemPage } = useMovePage();

  return (
    <main className="flex flex-col gap-5">
      <Title content="R:map" />
      <CircleLine amount={8} />
      <NotionList
        notionList={[
          ...mockNotionBear.relatedNotions,
          ...mockNotionSnowWhite.relatedNotions,
        ]}
        handlePlusButtonClick={handlePlusButtonClick}
        handleMoreMenuButtonClick={handleMoreMenuButtonClick}
        handleNotionItemClick={moveNotionItemPage}
      />
      {bottomSheetComponent}
    </main>
  );
}
