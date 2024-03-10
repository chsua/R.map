import { useToastContext } from '@components/context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { PATCH_URL } from 'constants/url';
import { RequestRelatedNotion } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const useEditRelatedNotion = (
  id: number,
  folderId: number,
  subEvent?: () => void,
) => {
  const queryClient = useQueryClient();
  const { addMessage } = useToastContext();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestRelatedNotion[]) =>
      fetchWithoutGet(PATCH_URL.RELATED_NOTION_LIST(id), 'PATCH', data),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        console.log(folderId);
        queryClient.invalidateQueries([QUERY_KEY.GRAPH, String(folderId)]);

        subEvent && subEvent();
        addMessage('관련성을 수정했습니다.');
      },
      onError: (error) => {
        addMessage('관련성 수정에 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
