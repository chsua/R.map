import type { Meta, StoryObj } from '@storybook/react';

import NotionForm from '.';

/**
 * 현재는 글자수 등을 제한하지 않음
 */
const meta = {
  title: 'component/NotionForm',
  component: NotionForm,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '개념을 추가하는 form',
  },
} satisfies Meta<typeof NotionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 모형
 */
export const Default: Story = { args: { notionFolderId: 1 } };
