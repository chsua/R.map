import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { mockNotionBanana } from '@mocks/mockData/notion';

import NotionList from '.';

/**
 * 더하기버튼을 누르면 개념을 추가할 수 있음
 * 노션 내 더보기 버튼을 누르면 이벤트 발생
 * 노션 아이템 버튼을 누르면 이벤트 발생
 */
const meta = {
  title: 'component/NotionList',
  component: NotionList,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '개념 목록',
  },
} satisfies Meta<typeof NotionList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    notionList: mockNotionBanana.relatedNotions,
    handlePlusButtonClick: action('더하기 버튼 클릭 이벤트 발생'),
    handleMoreMenuButtonClick: action('노션 내 더보기 버튼 클릭 이벤트 발생'),
    handleNotionItemClick: action('노션 아이템 버튼 클릭 이벤트 발생'),
  },
};
