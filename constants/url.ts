// const base = "";
const base = process.env.NEXT_PUBLIC_BASE_URL;

export const GET_URL = {
  NOTION_ITEM_MOCK: () => `/notions/:id`,
  NOTION_ITEM: (id: number) => `${base}/notions/${id}`,
};

export const POST_URL = {
  NOTION_ITEM_MOCK: () => `/notions`,
  NOTION_ITEM: () => `${base}/notions`,
};
