'use client';

import { useEffect, useState } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';
import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useNotionItemBottomSheet } from 'hooks/useNotionItemBottomSheet';
import { useMovePage } from 'hooks/useMovePage';

import { GET_URL } from 'constants/url';
import { getFetch } from 'utils/fetch';
import { Notion } from 'types/notion';

export default function notion({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion>();

  const { addNotionItem } = useRecentlyNotionContext();
  const { moveNotionItemPage } = useMovePage();

  //현재는 수정기능이 없으므로 "make"로 설정
  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useNotionItemBottomSheet('make', data);

  const url = GET_URL.NOTION_ITEM(params.id);

  const handleNotionItemClick = (id: number) => {
    data && addNotionItem({ id: params.id, name: data.name });
    moveNotionItemPage(id);
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<Notion>(url);
      setData(data);
    })();
  }, []);

  return (
    data && (
      <main className="flex flex-col gap-5">
        <Title content={data.name} />
        <CircleLine amount={8} />
        <Description content={data.description} />
        <NotionList
          notionList={data.relatedNotionList}
          handlePlusButtonClick={handlePlusButtonClick}
          handleMoreMenuButtonClick={handleMoreMenuButtonClick}
          handleNotionItemClick={handleNotionItemClick}
        />
        {bottomSheetComponent}
      </main>
    )
  );
}
