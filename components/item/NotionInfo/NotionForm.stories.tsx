import type { Meta, StoryObj } from '@storybook/react';

import NotionInfo from '.';
import { mockNotionBear } from '@mocks/mockData/notion';

/**
 * 현재는 글자수 등을 제한하지 않음
 */
const meta = {
  title: 'component/NotionInfo',
  component: NotionInfo,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '노션 정보를 알려주는 컨텐츠',
  },
} satisfies Meta<typeof NotionInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 모형
 */
export const Default: Story = {
  args: { notion: mockNotionBear, handleNotionItemClick: () => {} },
};
