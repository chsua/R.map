'use client';

import { useEffect, useState } from 'react';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { useNotionItemBottomSheet } from 'hooks/useNotionItemBottomSheet';
import { useMovePage } from 'hooks/useMovePage';

import { EssenceNotion } from 'types/notion';
import { getFetch } from 'utils/fetch';
import { GET_URL } from 'constants/url';

export default function Home() {
  const [data, setData] = useState<EssenceNotion[]>();

  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useNotionItemBottomSheet('make');

  const { moveNotionItemPage } = useMovePage();

  useEffect(() => {
    (async () => {
      const data = await getFetch<EssenceNotion[]>(GET_URL.NOTION_GRAPH_LIST());
      setData(data);
    })();
  }, []);

  return (
    data && (
      <main className="flex flex-col gap-5">
        <Title content="R:map" />
        <CircleLine amount={8} />
        <NotionList
          style="md:grid-cols-2 lg:grid-cols-3"
          notionList={data}
          handlePlusButtonClick={handlePlusButtonClick}
          handleMoreMenuButtonClick={handleMoreMenuButtonClick}
          handleNotionItemClick={moveNotionItemPage}
        />
        {bottomSheetComponent}
      </main>
    )
  );
}
