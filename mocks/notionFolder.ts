import { rest } from 'msw';
import { DELETE_URL, GET_URL, POST_URL } from 'constants/url';
import { mockNotionFolder } from './mockData/notionFolder';

export const notionFolder = [
  rest.get(GET_URL.NOTION_FOLDER_LIST_MOCK(), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockNotionFolder));
  }),

  rest.post(POST_URL.NOTION_FOLDER_MOCK(), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1 }));
  }),

  rest.delete(DELETE_URL.NOTION_FOLDER_MOCK(), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];

export const getNotionListInFolder = [
  rest.get(GET_URL.NOTION_LIST_IN_FOLDER_MOCK(), (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockNotionFolder));
  }),
];
