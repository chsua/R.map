import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { GET_URL } from 'constants/url';
import { EssentialNotion } from 'types/notion';
import { getFetch } from 'utils/fetch';
import { useToastContext } from '@components/context/toast';

export const useGetNotionFolderList = () => {
  const { addMessage } = useToastContext();

  const { data, error, isError, isLoading, refetch } = useQuery(
    [QUERY_KEY.NOTION_FOLDER_LIST],
    () => getFetch<EssentialNotion[]>(GET_URL.NOTION_FOLDER_LIST()),
    {
      suspense: true,
      onSuccess: (data) => {
        //
      },
      onError: (error) => {
        addMessage(
          '개념 폴더를 가지고 오지 못했습니다. 오류가 반복된다면 관리자에게 문의해주세요.',
        );
      },
    },
  );

  //여기서 에러를 던져야 에러바운더리에 걸림
  if (isError) throw new Error(JSON.stringify(error));

  return { data, error, isLoading, refetch };
};
