import { useRouter } from 'next/navigation';

export const useMovePage = () => {
  const router = useRouter();

  const moveMainPage = (option?: any, callback?: () => void): void => {
    callback && callback();
    router.push(`/`, { scroll: true, ...option });
  };

  const moveNotionFolderItemListPage = (
    id: number,
    option?: any,
    callback?: () => void,
  ) => {
    callback && callback();
    router.push(`/folder/${id}`, { scroll: true, ...option });
  };

  const moveNotionItemPage = (
    id: number,
    option?: any,
    callback?: () => void,
  ) => {
    callback && callback();
    router.push(`/notion/${id}`, { scroll: true, ...option });
  };

  return { moveMainPage, moveNotionFolderItemListPage, moveNotionItemPage };
};
