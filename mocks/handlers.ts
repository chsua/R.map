import { getNotionFolder, getNotionListInFolder } from './notionFolder';
import { getNotionItem, postNotionItem } from './notionItem';

export const handlers = [
  ...getNotionItem,
  ...postNotionItem,
  ...getNotionFolder,
  ...getNotionListInFolder,
];
