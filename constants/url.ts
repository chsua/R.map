import { RequestDeleteRelevance } from 'types/notion';

// const base = '';
const base = process.env.NEXT_PUBLIC_BASE_URL;

export const GET_URL = {
  NOTION_ITEM_MOCK: () => `/notions/:id`,
  NOTION_ITEM: (id: number) => `${base}/notions/${id}`,
  NOTION_FOLDER_LIST_MOCK: () => `/notion-folders`,
  NOTION_FOLDER_LIST: () => `${base}/notion-folders`,
  NOTION_FOLDER_MOCK: () => `/notion-folders/:id`,
  NOTION_FOLDER: (id: number) => `${base}/notion-folders/${id}`,
  GRAPH_LIST_MOCK: () => `/notion-folders/:id/graphs`,
  GRAPH_LIST: (folderId: number) => `${base}/notion-folders/${folderId}/graphs`,
};

export const POST_URL = {
  NOTION_ITEM_MOCK: () => `/notions`,
  NOTION_ITEM: () => `${base}/notions`,
  NOTION_FOLDER_MOCK: () => `/notion-folders`,
  NOTION_FOLDER: () => `${base}/notion-folders`,
  NOTION_FOLDER_MERGE_MOCK: () => '/notion-folders/merge',
  NOTION_FOLDER_MERGE: () => `${base}/notion-folders/merge`,
};

export const DELETE_URL = {
  NOTION_ITEM_MOCK: () => `/notions/:id`,
  NOTION_ITEM: (id: number) => `${base}/notions/${id}`,
  NOTION_FOLDER_MOCK: () => `/notion-folders/:id`,
  NOTION_FOLDER: (id: number) => `${base}/notion-folders/${id}`,
  NOTION_RELEVANCE_MOCK: () => `/notion-relations`,
  NOTION_RELEVANCE: ({ id_1, id_2 }: RequestDeleteRelevance) =>
    `${base}/notion-relations?notionIds=${id_1},${id_2}`,
};

export const PATCH_URL = {
  NOTION_ITEM_MOCK: () => `/notions/:id`,
  NOTION_ITEM: (id: number) => `${base}/notions/${id}`,
  RELATED_NOTION_LIST_MOCK: (id: number) => `${base}/notion-relations/${id}`,
  RELATED_NOTION_LIST: (id: number) => `${base}/notion-relations/${id}`,
};
