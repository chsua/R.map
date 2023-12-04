import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BottomSheet from '.';

/**
 * - 닫는 이벤트를 props로 내려주어 배경을 클릭하면 닫히도록 설정
 *  - 배경을 클릭하거나, esc를 누르거나, 숨겨진 닫기버튼(리더기용)을 누르면 action 발생
 * - 내부에 string, div 등 제한없이 넣을 수 있으며 자동으로 가로, 세로 중앙으로 배치됨
 * - 사이즈는 "sm" , "md", "lg"로 높이를 조절함
 * - 가로길이는 100%이며, 1000px이 최댓값
 */
const meta = {
  title: 'common/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '바닥에서 올라오는 bottom sheet',
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 줄글이 자식 컴포넌트로 들어오는 경우
 */
export const Default: Story = {
  args: {
    children: (
      <p>
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라
        만세.동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세.
      </p>
    ),
    closeEvent: action('닫는 이벤트 발생'),
  },
};
