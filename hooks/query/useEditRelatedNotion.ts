import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { PATCH_URL } from 'constants/url';
import { RequestRelatedNotion } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const useEditRelatedNotion = (id: number, subEvent?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestRelatedNotion[]) =>
      fetchWithoutGet(PATCH_URL.RELATED_NOTION_LIST(id), 'PATCH', data),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        queryClient.invalidateQueries([QUERY_KEY.NOTION, String(id)]);

        subEvent && subEvent();
      },
      onError: (error) => {
        alert('관련개념 수정을 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};