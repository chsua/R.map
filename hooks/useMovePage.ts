import { useRouter } from 'next/navigation';

export const useMovePage = () => {
  const router = useRouter();

  const moveNotionItemPage = (id: number, callback?: () => void) => {
    callback && callback();
    router.push(`/notion/${id}`, { scroll: true });
  };

  return { moveNotionItemPage };
};
