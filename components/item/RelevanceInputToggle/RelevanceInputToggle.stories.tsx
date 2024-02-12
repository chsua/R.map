import type { Meta, StoryObj } from '@storybook/react';
import RelevanceInputToggle from '.';
import { RelevanceNotion } from 'types/notion';

const meta = {
  title: 'component/RelevanceInputToggle',
  component: RelevanceInputToggle,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '토글하여 관계성을 입력하는 컴포넌트',
  },
} satisfies Meta<typeof RelevanceInputToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const MOCK_DATA: RelevanceNotion = {
  id: 1,
  name: '바나나',
  relevance: '',
  reverseRelevance: '',
};

export const Default: Story = {
  args: {
    originNotionName: '딸기',
    notion: MOCK_DATA,
    setRelevance: () => {},
    setReverseRelevance: () => {},
  },
};
