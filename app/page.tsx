'use client';

import { useEffect, useState } from 'react';
import { worker } from '../mocks/worker';

import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';
import NotionList from '@components/item/NotionList';

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

  return (
    <main className="flex flex-col gap-5">
      <Title content="개념" />
      <CircleLine amount={8} />
      <NotionList
        handlePlusButtonClick={() => {}}
        handleMoreMenuButtonClick={() => {}}
        handleNotionItemClick={() => {}}
      />
    </main>
  );
}
