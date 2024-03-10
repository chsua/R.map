import { useToastContext } from '@components/context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { POST_URL } from 'constants/url';
import { RequestNotionForPost } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const usePostNotion = (
  type: 'folder' | 'notion',
  id: number,
  subEvent?: () => void,
) => {
  const { addMessage } = useToastContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestNotionForPost) =>
      fetchWithoutGet(POST_URL.NOTION_ITEM(), 'POST', data),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        queryClient.invalidateQueries([
          type === 'folder'
            ? QUERY_KEY.NOTION_LIST_IN_FOLDER
            : QUERY_KEY.NOTION,
          String(id),
        ]);

        addMessage('개념을 등록했습니다.');
        subEvent && subEvent();
      },
      onError: (error) => {
        addMessage('개념 등록을 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
