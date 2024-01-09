import { notionFolder, getNotionListInFolder } from './notionFolder';
import { getNotionItem, postNotionItem } from './notionItem';

export const handlers = [
  ...getNotionItem,
  ...postNotionItem,
  ...notionFolder,
  ...getNotionListInFolder,
];
