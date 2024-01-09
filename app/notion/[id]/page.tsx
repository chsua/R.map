'use client';

import { useEffect, useState } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';
import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useMovePage } from 'hooks/useMovePage';

import { GET_URL } from 'constants/url';
import { getFetch } from 'utils/fetch';
import { Notion } from 'types/notion';

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion>();

  const { updateRecentlyNotionList } = useRecentlyNotionContext();
  const { moveNotionItemPage } = useMovePage();

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
  }, []);

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
          handleNotionItemClick={handleNotionItemClick}
        />
      </main>
    )
  );
}
