import { getNotionItem, postNotionItem } from './notionItem';

export const handlers = [...getNotionItem, ...postNotionItem];
