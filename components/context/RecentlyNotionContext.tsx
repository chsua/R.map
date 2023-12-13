import { createContext, useContext, useState } from 'react';
import { EssenceNotion } from 'types/notion';
import { Color } from 'types/style';

interface ContextNotionInfo extends EssenceNotion {
  color: Color;
}

interface RecentlyNotionContextProps {
  recentlyNotionList: ContextNotionInfo[];
  updateRecentlyNotionList: (
    notionForAdd: EssenceNotion,
    nowNotionId: number,
    relationNotionList: EssenceNotion[],
  ) => void;
}

const limitCount = 7;

export const recentlyNotionContext = createContext<RecentlyNotionContextProps>({
  recentlyNotionList: [],
  updateRecentlyNotionList: (
    notionForAdd: EssenceNotion,
    nowNotionId: number,
    relationNotionList: EssenceNotion[],
  ) => {},
});

export default function RecentlyNotionContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyNotionList, setRecentlyNotionList] = useState<
    ContextNotionInfo[]
  >([]);

  const addNotionItem = (
    notion: EssenceNotion,
    notionList: ContextNotionInfo[],
  ): ContextNotionInfo[] => {
    const notOverlapList = notionList.filter(({ id }) => id !== notion.id);

    const newList =
      notOverlapList.length > limitCount
        ? notOverlapList.slice(notOverlapList.length - limitCount)
        : notOverlapList;

    return [...newList, { ...notion, color: 'default' }];
  };

  const checkNotionRelation = (
    notionList: ContextNotionInfo[],
    nowNotionId: number,
    relationNotionList: EssenceNotion[],
  ): ContextNotionInfo[] => {
    const relationNotionIdList = relationNotionList.map((notion) => notion.id);

    return notionList.map((notion) => {
      if (notion.id === nowNotionId) return { ...notion, color: 'orange' };

      if (relationNotionIdList.includes(notion.id))
        return { ...notion, color: 'lightOrange' };

      return { ...notion, color: 'default' };
    });
  };

  const updateRecentlyNotionList = (
    notionForAdd: EssenceNotion,
    nowNotionId: number,
    relationNotionList: EssenceNotion[],
  ) => {
    setRecentlyNotionList(
      checkNotionRelation(
        addNotionItem(notionForAdd, recentlyNotionList),
        nowNotionId,
        relationNotionList,
      ),
    );
  };

  return (
    <recentlyNotionContext.Provider
      value={{ recentlyNotionList, updateRecentlyNotionList }}
    >
      {children}
    </recentlyNotionContext.Provider>
  );
}

export const useRecentlyNotionContext = () => useContext(recentlyNotionContext);
