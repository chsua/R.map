'use client';

import { useEffect, useState } from 'react';

import CircleLine from '@components/common/CircleLine';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useMovePage } from 'hooks/useMovePage';

import { GET_URL } from 'constants/url';
import { getFetch } from 'utils/fetch';
import { EssenceNotion } from 'types/notion';

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<EssenceNotion[]>();

  const { moveNotionItemPage } = useMovePage();

  const url = GET_URL.NOTION_LIST_IN_FOLDER(params.id);

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<EssenceNotion[]>(url);
      setData(data);
    })();
  }, []);

  return (
    data && (
      <main className="flex flex-col gap-5">
        <Title content={data && data[0] ? data[0].name : 'Graph loading...'} />
        <CircleLine amount={8} />
        <NotionList
          style="md:grid-cols-2 lg:grid-cols-3"
          notionList={data}
          handleNotionItemClick={handleNotionItemClick}
        />
      </main>
    )
  );
}
