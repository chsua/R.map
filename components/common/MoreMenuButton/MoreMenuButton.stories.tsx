import type { Meta, StoryObj } from '@storybook/react';
import MoreMenuButton from '.';

/**
 * - 기본으로 가로로 설정이 되어 있음
 * - 가로/세로로 정렬이 가능함
 */
const meta = {
  title: 'common/MoreMenuButton',
  component: MoreMenuButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '더보기 메뉴 버튼',
  },
} satisfies Meta<typeof MoreMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본은 가로
 */
export const Default: Story = {
  args: {},
};

/**
 * 세로로 설정하는 경우
 */
export const DirectionCol: Story = {
  args: {
    direction: 'column',
  },
};

/**
 * 작은 사이즈로 설정하는 경우
 */
export const SizeSm: Story = {
  args: {
    size: 'sm',
  },
};
