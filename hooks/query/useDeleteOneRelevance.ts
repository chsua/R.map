import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { DELETE_URL } from 'constants/url';
import { RequestDeleteRelevance } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const useDeleteOneRelevance = (id: number, subEvent?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestDeleteRelevance) =>
      fetchWithoutGet(DELETE_URL.NOTION_RELEVANCE(data), 'DELETE'),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEY.NOTION, String(id)]);

        subEvent && subEvent();
      },
      onError: (error) => {
        alert('개념 관계 끊기를 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
