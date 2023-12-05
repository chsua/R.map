'use client';

import { ReactNode, useEffect, useState } from 'react';
import { worker } from '../mocks/worker';

import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';
import NotionList from '@components/item/NotionList';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';

type Content = 'notionItemForm' | 'notionItemPlusMenu' | 'notionItem';

const content: Record<Content, ReactNode> = {
  notionItemForm: <NotionForm />,
  notionItemPlusMenu: <></>,
  notionItem: <></>,
};

export default function Home() {
  // if (process.env.NODE_ENV === 'development') {
  //   worker.start();
  // }

  // const [data, setData] = useState();

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('/example', { method: 'get' });
  //     const data = await response.json();
  //     setData(data);
  //   })();
  // }, []);

  const [bottomSheetContent, setBottomSheetContent] = useState<Content | null>(
    null,
  );

  return (
    <main className="flex flex-col gap-5">
      <Title content="개념" />
      <CircleLine amount={8} />
      <NotionList
        handlePlusButtonClick={() => setBottomSheetContent('notionItemForm')}
        handleMoreMenuButtonClick={() =>
          setBottomSheetContent('notionItemPlusMenu')
        }
        handleNotionItemClick={() => setBottomSheetContent('notionItem')}
      />
      {bottomSheetContent && (
        <BottomSheet closeEvent={() => setBottomSheetContent(null)}>
          {content[bottomSheetContent]}
        </BottomSheet>
      )}
    </main>
  );
}
