import { createContext, useContext, useMemo, useState } from 'react';
import { EssentialNotion } from 'types/notion';
import { Color } from 'types/style';

interface ContextNotionInfo extends EssentialNotion {
  color: Color;
}

interface RecentlyNotionContextProps {
  nowNotionFolder: EssentialNotion | null;
  updateNowNotionFolder: (data: EssentialNotion) => void;
  recentlyNotionList: ContextNotionInfo[];
  updateRecentlyNotionList: (
    notionForAdd: EssentialNotion,
    nowNotionId: number,
    relationNotionList: EssentialNotion[],
  ) => void;
  resetAllData: () => void;
  deleteNotion: (id: number) => void;
}

const limitCount = 7;

export const recentlyNotionContext = createContext<RecentlyNotionContextProps>({
  nowNotionFolder: null,
  updateNowNotionFolder: (data: EssentialNotion) => {},
  recentlyNotionList: [],

  updateRecentlyNotionList: (
    notionForAdd: EssentialNotion,
    nowNotionId: number,
    relationNotionList: EssentialNotion[],
  ) => {},
  resetAllData: () => {},
  deleteNotion: () => {},
});

export default function RecentlyNotionContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [recentlyNotionList, setRecentlyNotionList] = useState<
    ContextNotionInfo[]
  >([]);
  const [nowNotionFolder, setNowNotionFolder] =
    useState<EssentialNotion | null>(null);

  const addNotionItem = (
    notion: EssentialNotion,
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
    relationNotionList: EssentialNotion[],
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
    notionForAdd: EssentialNotion,
    nowNotionId: number,
    relationNotionList: EssentialNotion[],
  ) => {
    setRecentlyNotionList(
      checkNotionRelation(
        addNotionItem(notionForAdd, recentlyNotionList),
        nowNotionId,
        relationNotionList,
      ),
    );
  };

  const updateNowNotionFolder = (data: EssentialNotion) => {
    setNowNotionFolder(data);
  };

  const resetAllData = () => {
    setNowNotionFolder(null);
    setRecentlyNotionList([]);
  };

  const deleteNotion = (notionId: number) => {
    const notOverlapList = recentlyNotionList.filter(
      ({ id }) => id !== notionId,
    );

    console.log(notOverlapList);
    if (notOverlapList.length === recentlyNotionList.length) return;

    console.log(notOverlapList);
    setRecentlyNotionList(notOverlapList);
  };

  return (
    <recentlyNotionContext.Provider
      value={{
        nowNotionFolder,
        updateNowNotionFolder,
        recentlyNotionList,
        updateRecentlyNotionList,
        resetAllData,
        deleteNotion,
      }}
    >
      {children}
    </recentlyNotionContext.Provider>
  );
}

export const useRecentlyNotionContext = () => useContext(recentlyNotionContext);
