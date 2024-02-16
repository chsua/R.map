import type { Meta, StoryObj } from '@storybook/react';
import ToggleBox from '.';
import { useRef } from 'react';
import { ToggleControlRef } from 'types/etc';

const meta = {
  title: 'common/ToggleBox',
  component: ToggleBox,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '토글하여 여닫는 박스',
  },
} satisfies Meta<typeof ToggleBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export function Default() {
  const children = <button>토글을 여닫는 버튼</button>;
  const toggleChildren = <p>보였다가 보이지 않는 자식</p>;

  return (
    <ToggleBox
      isOpen={true}
      children={children}
      toggleChildren={toggleChildren}
    />
  );
}
