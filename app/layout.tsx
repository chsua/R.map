'use client';

import RecentlyNotionContext from '@components/context/RecentlyNotionContext';
import Navigation from '@components/item/Navigation';

import './globals.css';
// import { turnOnMsw } from 'utils/turnOnMsw';
import ModalContext from '@components/context/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ToastContext from '@components/context/toast';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // turnOnMsw();

  const queryClient = new QueryClient();

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <ModalContext>
            <ToastContext>
              <RecentlyNotionContext>
                <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] h-fit my-[3vh] sm:my-[5vh] m-auto ">
                  <Navigation />
                  {children}
                </div>
              </RecentlyNotionContext>
            </ToastContext>
          </ModalContext>
        </QueryClientProvider>
      </body>
    </html>
  );
}
