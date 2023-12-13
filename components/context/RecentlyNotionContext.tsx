import { createContext, useContext, useState } from 'react';
import { EssenceNotion } from 'types/notion';

interface ContextNotionInfo extends EssenceNotion {}
interface RecentlyNotionContextProps {
  recentlyNotionList: EssenceNotion[];
  addNotionItem: (notion: EssenceNotion) => void;
}

const limitCount = 7;

export const recentlyNotionContext = createContext<RecentlyNotionContextProps>({
  recentlyNotionList: [],
  addNotionItem: (notion: EssenceNotion) => {},
});

export default function RecentlyNotionContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyNotionList, setRecentlyNotionList] = useState<EssenceNotion[]>(
    [],
  );

  const addNotionItem = (notion: EssenceNotion) => {
    const notOverlapList = recentlyNotionList.filter(
      ({ id }) => id !== notion.id,
    );

    const newList =
      notOverlapList.length > limitCount
        ? notOverlapList.slice(notOverlapList.length - limitCount)
        : notOverlapList;

    setRecentlyNotionList([...newList, notion]);
  };

  const checkNotionRelation = (
    nowNotionId: number,
    relationNotionList: EssenceNotion[],
  ) => {};

  return (
    <recentlyNotionContext.Provider
      value={{ recentlyNotionList, addNotionItem }}
    >
      {children}
    </recentlyNotionContext.Provider>
  );
}

export const useRecentlyNotionContext = () => useContext(recentlyNotionContext);
