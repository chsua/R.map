import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="w-[95vw] sm:w-[90vw] md:w-[80vw] h-[90vh] mt-[5vh] m-auto ">
          {children}
        </div>
      </body>
    </html>
  );
}
