'use client';

import { ReactNode, useEffect, useState } from 'react';
import { worker } from '../mocks/worker';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';

import { useRouter } from 'next/navigation';

type Content = 'notionItemForm' | 'notionItemPlusMenu';

const content: Record<Content, ReactNode> = {
  notionItemForm: <NotionForm />,
  notionItemPlusMenu: <></>,
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

  const router = useRouter();
  const [bottomSheetContent, setBottomSheetContent] = useState<Content | null>(
    null,
  );

  const moveNotionItemPage = (id: number) => {
    router.push(`/notion/${id}`, { scroll: true });
  };

  return (
    <main className="flex flex-col gap-5">
      <Title content="개념" />
      <CircleLine amount={8} />
      <NotionList
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
