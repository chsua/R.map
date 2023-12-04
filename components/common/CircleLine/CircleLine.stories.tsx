import type { Meta, StoryObj } from '@storybook/react';
import CircleLine from '.';

/**
 * - 기본으로 가로로 설정이 되어 있음
 * - 갯수를 설정해 가로 길이를 조절할 수 있음
 */
const meta = {
  title: 'common/CircleLine',
  component: CircleLine,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '장식용 원으로 구성된 직선',
  },
  argTypes: {
    amount: { control: { type: 'range', min: 1, max: 30, step: 1 } },
  },
} satisfies Meta<typeof CircleLine>;

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
