import { useToastContext } from '@components/context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { POST_URL } from 'constants/url';
import { RequestSplitFolder } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const useSplitFolder = (folderId: number, subEvent?: () => void) => {
  const { addMessage } = useToastContext();
  const queryClient = useQueryClient();

  const { mutate, isLoading, isSuccess } = useMutation(
    ({ notionId, data }: { notionId: number; data: RequestSplitFolder }) =>
      fetchWithoutGet(
        POST_URL.NOTION_FOLDER_SPLIT(folderId, notionId),
        'POST',
        data,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          QUERY_KEY.NOTION_LIST_IN_FOLDER,
          String(folderId),
        ]);

        addMessage('폴더를 분리했습니다.');
        subEvent && subEvent();
      },
      onError: (error) => {
        addMessage('폴더 분리를 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
