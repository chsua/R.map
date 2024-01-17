'use client';

import RecentlyNotionContext from '@components/context/RecentlyNotionContext';
import Navigation from '@components/item/Navigation';

import './globals.css';
import { turnOnMsw } from 'utils/turnOnMsw';
import ModalContext from '@components/context/ModalContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  turnOnMsw();

  const queryClient = new QueryClient();

  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryClient}>
          <ModalContext>
            <RecentlyNotionContext>
              <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] h-[90vh] mt-[2vh] sm:mt-[5vh] m-auto ">
                <Navigation />
                {children}
              </div>
            </RecentlyNotionContext>
          </ModalContext>
        </QueryClientProvider>
      </body>
    </html>
  );
}
