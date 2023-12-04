import type { Meta, StoryObj } from '@storybook/react';

import PlusNotionButton from '.';

/**
 * 크기는 "sm", "md", "lg"
 */
const meta = {
  title: 'component/PlusNotionButton',
  component: PlusNotionButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '개념을 추가하는 버튼',
  },
} satisfies Meta<typeof PlusNotionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 짧은 문자열이 컨텐츠로 들어오는 경우
 */
export const Default: Story = {};
