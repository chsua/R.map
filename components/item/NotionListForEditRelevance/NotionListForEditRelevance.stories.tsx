import type { Meta, StoryObj } from '@storybook/react';
import NotionListForEditRelevance from '.';
import { EssentialNotion } from 'types/notion';

const meta = {
  title: 'component/NotionListForEditRelevance',
  component: NotionListForEditRelevance,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '관계성을 입력하는 input이 포함된 노션의 리스트',
  },
} satisfies Meta<typeof NotionListForEditRelevance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
