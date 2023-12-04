import type { Meta, StoryObj } from '@storybook/react';
import RoundSquare from '.';
import MoreMenuButton from '../MoreMenuButton';

/**
 * - 내부에 string, div 등 제한없이 넣을 수 있으며 자동으로 가로, 세로 중앙으로 배치됨
 * - 사이즈는 "sm" , "md", "lg", "free"로 구분
 *  - "free"는 내부 컨텐트에 맞춰짐
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
    children: '예시입니다',
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

/**
 * 실제 사용 예시
 */
export const RealUsing: Story = {
  args: {
    size: 'sm',
    children: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '90%',
          gap: '5px',
        }}
      >
        <p>여기에 개념 이름이 들어가게 됩니다.</p>
        <MoreMenuButton direction="column" size="sm" />
      </div>
    ),
  },
};
