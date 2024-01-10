import { DELETE_URL } from 'constants/url';
import { fetchWithoutGet } from './fetch';

export const deleteNotion = (id: number, subEvent?: () => void) => {
  fetchWithoutGet(DELETE_URL.NOTION_ITEM(id), 'delete')
    .then(() => {
      subEvent && subEvent();
    })
    .catch(() => {
      alert('개념 삭제가 실패했습니다. 다시 확인해주세요.');
    });
};
