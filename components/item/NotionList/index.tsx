import { ReactNode } from 'react';

interface NotionListProps {
  children?: ReactNode;
  style?: string;
}

export default function NotionList({ children, style = '' }: NotionListProps) {
  return (
    <ul className={`h-fit grid grid-cols-1 gap-3 items-start ${style}`}>
      {children}
    </ul>
  );
}
