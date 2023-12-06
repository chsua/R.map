import { rest } from 'msw';
import { findMockNotionItem } from './mockData/notionList';

export const getNotionItem = [
  rest.get('/notions/:id', (req, res, ctx) => {
    const targetId = req.params.id;

    if (typeof targetId === 'string') {
      const mockData = findMockNotionItem(+targetId);
      return res(ctx.status(200), ctx.json(mockData));
    }

    return res(ctx.status(404), ctx.json({}));
  }),
];

// export const notionItem = [
//   rest.get('/example', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json("hi! It's mockData"));
//   }),
// ];
