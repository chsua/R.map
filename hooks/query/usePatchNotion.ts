import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { PATCH_URL } from 'constants/url';
import { RequestNotionForPatch } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const usePatchNotion = (notionId: number, subEvent?: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestNotionForPatch) =>
      fetchWithoutGet(PATCH_URL.NOTION_ITEM(notionId), 'PATCH', data),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        queryClient.invalidateQueries([QUERY_KEY.NOTION, String(notionId)]);

        subEvent && subEvent();
      },
      onError: (error) => {
        alert('개념 수정를 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
