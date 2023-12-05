'use client';

import RecentlyNotionContext from '@components/context/RecentlyNotionContext';
import './globals.css';
import Navigation from '@components/item/Navigation';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RecentlyNotionContext>
          <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] h-[90vh] mt-[2vh] sm:mt-[5vh] m-auto ">
            <Navigation />
            {children}
          </div>
        </RecentlyNotionContext>
      </body>
    </html>
  );
}
