import { worker } from '@mocks/worker';

export const turnOnMsw = () => {
  if (process.env.NODE_ENV === 'development') {
    worker.start();
  }
};
