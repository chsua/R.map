import type { Meta, StoryObj } from '@storybook/react';
import RoundSquare from '.';

/**
 * - 내부에 string, div 등 제한없이 넣을 수 있으며 자동으로 가로, 세로 중앙으로 배치됨
 * - hover시 색이 변화
 */
const meta = {
  title: 'common/RoundSquare',
  component: RoundSquare,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '모서리가 둥근 네모상자',
  },
} satisfies Meta<typeof RoundSquare>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 문자열이 자식컴포넌트로 들어오는 경우
 */
export const StringChildren: Story = {
  args: {
    children: 'dddd',
  },
};

/**
 * 버튼이 자식 컴포넌트로 들어오는 경우
 */
export const ButtonChildren: Story = {
  args: {
    children: (
      <button style={{ height: '100%', width: '100%' }}>
        이것은 버튼입니다.
      </button>
    ),
  },
};

/**
 * 여러 개의 자식 컴포넌트가 들어오는 경우. 일반적인 배치에 맞게 세로로 내려가도록 작동
 */
export const MultiChildren: Story = {
  args: {
    children: (
      <>
        <div style={{ color: 'red', height: '100%', width: '100%' }}>
          색색이 달라지는 예시
        </div>
        <div style={{ color: 'yellow', height: '100%', width: '100%' }}>
          색색이 달라지는 예시
        </div>
        <div style={{ color: 'blue', height: '100%', width: '100%' }}>
          색색이 달라지는 예시
        </div>
      </>
    ),
  },
};
