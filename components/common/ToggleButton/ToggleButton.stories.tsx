import type { Meta, StoryObj } from '@storybook/react';
import ToggleButton from '.';

const meta = {
  title: 'common/ToggleButton',
  component: ToggleButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '토글을 위한 버튼',
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { isOpened: true },
};
