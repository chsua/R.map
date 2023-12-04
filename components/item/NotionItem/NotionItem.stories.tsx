import type { Meta, StoryObj } from '@storybook/react';
import NotionItem from '.';

/**
 * 가로길이보다 긴 개념은 말줄임표 처리
 */
const meta = {
  title: 'component/NotionItem',
  component: NotionItem,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '개념 이름이 들어가는 기본 컴포넌트',
  },
} satisfies Meta<typeof NotionItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 짧은 문자열이 컨텐츠로 들어오는 경우
 */
export const ShortContent: Story = {
  args: {
    content: '짧은 개념',
  },
};

/**
 * 긴 문자열이 컨텐츠로 들어오는 경우
 */
export const LongContent: Story = {
  args: {
    content: '길다랗고 길다란 너무 너무 길어서 어쩌면 다 담기지 않는 개념',
  },
};
