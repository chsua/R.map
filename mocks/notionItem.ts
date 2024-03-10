import { rest } from 'msw';
import { findMockNotionItem } from './mockData/notion';
import { DELETE_URL, GET_URL, PATCH_URL, POST_URL } from 'constants/url';

/**
 * 노션 가져오기 [O]
 * 노션 삭제하기 [O]
 * 노션 수정하기 [O]
 * 노션 추가하기 [O]
 */
export const notionItem = [
  rest.get(GET_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    const targetId = req.params.id;

    if (typeof targetId === 'string') {
      const mockData = findMockNotionItem(+targetId);
      return res(ctx.status(200), ctx.json(mockData));
    }

    return res(ctx.status(404), ctx.json({}));
  }),

  rest.post(POST_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ id: Date.now() }));
  }),

  rest.patch(PATCH_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({}));
  }),

  rest.delete(DELETE_URL.NOTION_ITEM_MOCK(), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({}));
  }),

  rest.delete(DELETE_URL.NOTION_RELEVANCE_MOCK(), (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({}));
  }),
];
