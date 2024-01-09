import { useRouter } from 'next/navigation';

export const useMovePage = () => {
  const router = useRouter();

  const moveMainPage = (callback?: () => void): void => {
    callback && callback();
    router.push(`/`, { scroll: true });
  };

  const moveNotionFolderItemListPage = (id: number, callback?: () => void) => {
    callback && callback();
    router.push(`/folder/${id}`, { scroll: true });
  };

  const moveNotionItemPage = (id: number, callback?: () => void) => {
    callback && callback();
    router.push(`/notion/${id}`, { scroll: true });
  };

  return { moveMainPage, moveNotionFolderItemListPage, moveNotionItemPage };
};
