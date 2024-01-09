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

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion>();
  const [trigger, setTrigger] = useState(false);

  const { updateRecentlyNotionList } = useRecentlyNotionContext();
  const { moveNotionItemPage } = useMovePage();

  //현재는 수정기능이 없으므로 "make"로 설정
  const {
    handlePlusButtonClick,
    handleMoreMenuButtonClick,
    bottomSheetComponent,
  } = useNotionItemBottomSheet({
    type: 'make',
    notion: data,
    sideEffectFn: () => setTrigger(!trigger),
  });

  const url = GET_URL.NOTION_ITEM(params.id);

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<Notion>(url);
      setData(data);
      updateRecentlyNotionList(
        { id: data.id, name: data.name },
        data.id,
        data.relatedNotions,
      );
    })();
  }, [trigger]);

  return (
    data && (
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Title content={data.name} />
          <CircleLine amount={8} />
          <div className="min-h-[150px]">
            <Description content={data.content} />
          </div>
        </div>
        <NotionList
          notionList={data.relatedNotions}
          handlePlusButtonClick={handlePlusButtonClick}
          handleMoreMenuButtonClick={handleMoreMenuButtonClick}
          handleNotionItemClick={handleNotionItemClick}
        />
        {bottomSheetComponent}
      </main>
    )
  );
}
