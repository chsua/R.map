import { rest } from 'msw';
import { findMockNotionItem } from './mockData/notion';
import { GET_URL, POST_URL } from 'constants/url';

export const getNotionItem = [
  rest.get(GET_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    const targetId = req.params.id;

    if (typeof targetId === 'string') {
      const mockData = findMockNotionItem(+targetId);
      return res(ctx.status(200), ctx.json(mockData));
    }

    return res(ctx.status(404), ctx.json({}));
  }),
];

export const postNotionItem = [
  rest.post(POST_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: Date.now() }));
  }),
];
