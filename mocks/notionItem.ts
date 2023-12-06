import { rest } from 'msw';
import { mockNotionApple } from './mockData/notionList';

export const getNotionItem = [
  rest.get('/notions/:id', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockNotionApple));
  }),
];

// export const notionItem = [
//   rest.get('/example', (req, res, ctx) => {
//     return res(ctx.status(200), ctx.json("hi! It's mockData"));
//   }),
// ];
