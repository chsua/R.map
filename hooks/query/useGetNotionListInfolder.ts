import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { GET_URL } from 'constants/url';
import { NotionFolder } from 'types/notion';
import { getFetch } from 'utils/fetch';

export const useGetNotionListInfolder = (folderId: number) => {
  const url = GET_URL.NOTION_FOLDER(folderId);


  const { data, error, isError, isLoading, refetch } = useQuery(
    [QUERY_KEY.NOTION_LIST_IN_FOLDER, String(folderId)],
    () => getFetch<NotionFolder>(url),
    {
      suspense: true,
      onSuccess: (data) => {
        //
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );

  //여기서 에러를 던져야 에러바운더리에 걸림
  if (isError) throw new Error(JSON.stringify(error));

  return { data, error, isLoading, refetch };
};
