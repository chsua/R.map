import Checkbox from '@components/common/Checkbox';
import RoundSquare from '@components/common/RoundSquare';
import ToggleBox from '@components/common/ToggleBox';
import ToggleButton from '@components/common/ToggleButton';
import React, { ChangeEvent, useRef, useState } from 'react';
import { ToggleControlRef } from 'types/etc';
import { EssentialNotion, RelevanceNotion } from 'types/notion';

interface RelevanceInputToggleProps {
  originNotionName: string;
  notion: RelevanceNotion;
  setRelevance: (relevance: string) => void;
  setReverseRelevance: (relevance: string) => void;
}

export default function RelevanceInputToggle({
  originNotionName,
  notion,
  setRelevance,
  setReverseRelevance,
}: RelevanceInputToggleProps) {
  const toggleRef = useRef<ToggleControlRef>(null);
  const [toggleOpen, setToggleOpen] = useState(false);
  const [userInput, setUserInput] = useState<
    Pick<RelevanceNotion, 'relevance' | 'reverseRelevance'>
  >({ relevance: notion.relevance, reverseRelevance: notion.reverseRelevance });

  const relevancePlaceholder = `${originNotionName}에게 ${notion.name}(이)란`;
  const reverseRelevancePlaceholder = `${notion.name}에게 ${originNotionName}(이)란`;

  const writeRelevance =
    (type: 'relevance' | 'reverseRelevance') =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const nowString = e.target.value;

      if (type === 'relevance') {
        setRelevance(nowString);
        setUserInput((prev) => ({ ...prev, relevance: nowString }));
      } else {
        setReverseRelevance(nowString);
        setUserInput((prev) => ({ ...prev, reverseRelevance: nowString }));
      }
    };

  const children = (
    <div className="flex my-3">
      <Checkbox isChecked={true} />
      <p className="w-full mx-3">{notion.name} 토글</p>
      {
        <ToggleButton
          isOpened={toggleOpen}
          onClick={() => {
            toggleRef.current?.toggle();
            setToggleOpen((prev) => !prev);
          }}
        />
      }
    </div>
  );

  const toggleChildren = (
    <div className="flex flex-col gap-3 text-sm">
      <RoundSquare size="sm">
        <input
          className="w-[calc(100%-20px)]"
          value={userInput.relevance}
          placeholder={relevancePlaceholder}
          onChange={writeRelevance('relevance')}
        />
      </RoundSquare>
      <RoundSquare size="sm">
        <input
          className="w-[calc(100%-20px)]"
          value={userInput.reverseRelevance}
          placeholder={reverseRelevancePlaceholder}
          onChange={writeRelevance('reverseRelevance')}
        />
      </RoundSquare>
    </div>
  );

  return (
    <ToggleBox
      ref={toggleRef}
      children={children}
      toggleChildren={toggleChildren}
    />
  );
}
