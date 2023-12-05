'use client';

import React, { ReactNode, useState } from 'react';

import BottomSheet from '@components/common/BottomSheet';
import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';
import NotionForm from '@components/item/NotionForm';

import { mockNotionBanana } from '@mocks/mockData/notionList';

import { useRouter } from 'next/navigation';
import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';

type Content = 'notionItemForm' | 'notionItemPlusMenu';

const content: Record<Content, ReactNode> = {
  notionItemForm: <NotionForm />,
  notionItemPlusMenu: <></>,
};

export default function play({ params }: { params: { id: number } }) {
  const router = useRouter();
  const { addNotionItem } = useRecentlyNotionContext();
  const [bottomSheetContent, setBottomSheetContent] = useState<Content | null>(
    null,
  );

  //추후 fetch한 데이터로 수정
  const { id, name, description, relatedNotionList } = mockNotionBanana;

  const moveNotionItemPage = (id: number) => {
    addNotionItem({ id, name });
    router.push(`/notion/${id}`, { scroll: true });
  };

  return (
    <main className="flex flex-col gap-5">
      <Title content={name} />
      <CircleLine amount={8} />
      <Description content={description} />
      <NotionList
        notionList={relatedNotionList}
        handlePlusButtonClick={() => setBottomSheetContent('notionItemForm')}
        handleMoreMenuButtonClick={() =>
          setBottomSheetContent('notionItemPlusMenu')
        }
        handleNotionItemClick={moveNotionItemPage}
      />
      {bottomSheetContent && (
        <BottomSheet closeEvent={() => setBottomSheetContent(null)}>
          {content[bottomSheetContent]}
        </BottomSheet>
      )}
    </main>
  );
}
