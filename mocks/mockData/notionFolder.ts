import { NotionFolder } from 'types/notion';
import {
  mockEssentialNotionBanana,
  mockEssentialNotionBear,
  mockEssentialNotionMonkey,
  mockEssentialNotionSalmon,
} from './notion';

export const mockNotionFolder: NotionFolder = {
  id: 1,
  name: '원숭ㅇ이...?',
  notions: [
    mockEssentialNotionBanana,
    mockEssentialNotionMonkey,
    mockEssentialNotionBear,
    mockEssentialNotionSalmon,
  ],
};
