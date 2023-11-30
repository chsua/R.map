'use client';

import { useEffect, useState } from 'react';
import { worker } from '../mocks/worker';

export default function Home() {
  if (process.env.NODE_ENV === 'development') {
    worker.start();
  }

  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch('/example', { method: 'get' });
      const data = await response.json();
      setData(data);
    })();
  }, []);

  return (
    <main className="">
      This is main page. If you want to play any interaction, make some button
      <p className="text-gray-800">{data}</p>
    </main>
  );
}
