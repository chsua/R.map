import { notionFolder, getNotionListInFolder } from './notionFolder';
import { notionItem } from './notionItem';

export const handlers = [
  ...notionItem,
  ...notionFolder,
  ...getNotionListInFolder,
];
