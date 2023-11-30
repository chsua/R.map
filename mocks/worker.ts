'use client';

import { setupWorker } from 'msw';

import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

// 사용하는 클리어언트 컴포넌트에다가 위치시키기
// if (process.env.NODE_ENV === 'development') {
//   worker.start();
// }
