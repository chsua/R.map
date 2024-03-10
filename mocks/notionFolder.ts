import { rest } from 'msw';
import { DELETE_URL, GET_URL, POST_URL } from 'constants/url';
import { mockNotionFolder } from './mockData/notionFolder';
import { mockingStatus } from './statusController';

export const notionFolder = [
  rest.get(GET_URL.NOTION_FOLDER_LIST_MOCK(), (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(mockingStatus.get.notionFolderList),
      ctx.json(mockNotionFolder),
    );
  }),

  rest.post(POST_URL.NOTION_FOLDER_MOCK(), (req, res, ctx) => {
    return res(
      ctx.status(mockingStatus.post.notionFolder),
      ctx.json({ id: 1 }),
    );
  }),

  rest.delete(DELETE_URL.NOTION_FOLDER_MOCK(), (req, res, ctx) => {
    return res(ctx.status(mockingStatus.delete.notionFolder), ctx.json({}));
  }),

  rest.post(POST_URL.NOTION_FOLDER_MERGE_MOCK(), (req, res, ctx) => {
    return res(ctx.status(mockingStatus.post.notionFolderMerge), ctx.json({}));
  }),
];

export const getNotionListInFolder = [
  rest.get(GET_URL.NOTION_FOLDER_MOCK(), (req, res, ctx) => {
    return res(
      ctx.status(mockingStatus.get.notionFolder),
      ctx.json(mockNotionFolder),
    );
  }),
];
