import { useToastContext } from '@components/context/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from 'constants/queryKey';
import { PATCH_URL, POST_URL } from 'constants/url';
import { RequestMergeFolder, RequestNotionForPatch } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

export const useMergeNotionFolder = (subEvent?: () => void) => {
  const queryClient = useQueryClient();
  const { addMessage } = useToastContext();

  const { mutate, isLoading, isSuccess } = useMutation(
    (data: RequestMergeFolder) =>
      fetchWithoutGet(POST_URL.NOTION_FOLDER_MERGE(), 'POST', data),
    {
      onSuccess: () => {
        //왜 쿼리키가 숫자면 무효화가 되지 않지?
        queryClient.invalidateQueries([QUERY_KEY.NOTION_FOLDER_LIST]);
        addMessage('폴더를 합쳤습니다.');

        subEvent && subEvent();
      },
      onError: (error) => {
        addMessage('폴더 합치기에 실패했습니다.');
      },
    },
  );

  return { mutate, isLoading, isSuccess };
};
