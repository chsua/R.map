import { createContext, useContext, useState } from 'react';
import { NotionFolder } from 'types/notion';
import { Color } from 'types/style';

interface ContextNotionInfo extends NotionFolder {
  color: Color;
}

interface RecentlyNotionContextProps {
  recentlyNotionList: ContextNotionInfo[];
  updateRecentlyNotionList: (
    notionForAdd: NotionFolder,
    nowNotionId: number,
    relationNotionList: NotionFolder[],
  ) => void;
}

const limitCount = 7;

export const recentlyNotionContext = createContext<RecentlyNotionContextProps>({
  recentlyNotionList: [],
  updateRecentlyNotionList: (
    notionForAdd: NotionFolder,
    nowNotionId: number,
    relationNotionList: NotionFolder[],
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
    notion: NotionFolder,
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
    relationNotionList: NotionFolder[],
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
    notionForAdd: NotionFolder,
    nowNotionId: number,
    relationNotionList: NotionFolder[],
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
