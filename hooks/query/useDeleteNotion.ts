import { useToastContext } from '@components/context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { DELETE_URL } from 'constants/url';
import { fetchWithoutGet } from 'utils/fetch';

export const useDeleteNotion = (folderId: number, subEvent?: () => void) => {
  const queryClient = useQueryClient();
  const { addMessage } = useToastContext();

  const { mutate, isLoading, isSuccess } = useMutation(
    (id: number) => fetchWithoutGet(DELETE_URL.NOTION_ITEM(id), 'DELETE'),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        queryClient.invalidateQueries([
          QUERY_KEY.NOTION_LIST_IN_FOLDER,
          String(folderId),
        ]);
        queryClient.invalidateQueries([QUERY_KEY.NOTION, String(folderId)]);

        subEvent && subEvent();
        addMessage('개념을 삭제했습니다.');
      },
      onError: (error) => {
        addMessage('개념 삭제를 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
