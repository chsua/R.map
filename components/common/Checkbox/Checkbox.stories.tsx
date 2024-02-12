import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '.';

const meta = {
  title: 'common/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '기본 체크박스',
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isChecked: true },
};
