const base = '';
// const base = process.env.NEXT_PUBLIC_BASE_URL;

export const GET_URL = {
  NOTION_ITEM_MOCK: () => `/notions/:id`,
  NOTION_ITEM: (id: number) => `${base}/notions/${id}`,
  NOTION_FOLDER_LIST_MOCK: () => `/notion-folders`,
  NOTION_FOLDER_LIST: () => `${base}/notion-folders`,
  NOTION_LIST_IN_FOLDER_MOCK: () => `/notion-folders/:id`,
  NOTION_LIST_IN_FOLDER: (id: number) => `${base}/notion-folders/${id}`,
};

export const POST_URL = {
  NOTION_ITEM_MOCK: () => `/notions`,
  NOTION_ITEM: () => `${base}/notions`,
};
