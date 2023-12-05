import { createContext, useContext, useState } from 'react';
import { essenceNotion } from 'types/notion';

interface RecentlyNotionContextProps {
  recentlyNotionList: essenceNotion[];
  addNotionItem: (notion: essenceNotion) => void;
}

export const recentlyNotionContext = createContext<RecentlyNotionContextProps>({
  recentlyNotionList: [],
  addNotionItem: (notion: essenceNotion) => {},
});

export default function RecentlyNotionContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyNotionList, setRecentlyNotionList] = useState<essenceNotion[]>(
    [],
  );

  const addNotionItem = (notion: essenceNotion) => {
    const notOverlapList = recentlyNotionList.filter(
      ({ id }) => id !== notion.id,
    );

    const newList =
      notOverlapList.length > 4
        ? notOverlapList.slice(notOverlapList.length - 4)
        : notOverlapList;

    setRecentlyNotionList([...newList, notion]);
  };

  return (
    <recentlyNotionContext.Provider
      value={{ recentlyNotionList, addNotionItem }}
    >
      {children}
    </recentlyNotionContext.Provider>
  );
}

export const useRecentlyNotionContext = () => useContext(recentlyNotionContext);
