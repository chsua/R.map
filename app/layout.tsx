'use client';

import RecentlyNotionContext from '@components/context/RecentlyNotionContext';
import Navigation from '@components/item/Navigation';

import './globals.css';
// import { turnOnMsw } from 'utils/turnOnMsw';
import ModalContext from '@components/context/ModalContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // turnOnMsw();

  return (
    <html lang="ko">
      <body>
        <ModalContext>
          <RecentlyNotionContext>
            <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] h-fit my-[2vh] sm:my-[5vh] m-auto">
              <Navigation />
              {children}
            </div>
          </RecentlyNotionContext>
        </ModalContext>
      </body>
    </html>
  );
}
