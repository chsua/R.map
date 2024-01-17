import { EssentialNotion, NotionFolder } from 'types/notion';
import { mockNotionBear, mockNotionMonkey } from './notion';

export const mockNotionFolderList: EssentialNotion[] = [
  mockNotionMonkey,
  mockNotionBear,
];

export const mockNotionFolder: NotionFolder = {
  id: 1,
  name: '원숭ㅇ이...?',
  notions: [mockNotionMonkey, mockNotionBear],
};
