import Checkbox from '@components/common/Checkbox';
import RoundSquare from '@components/common/RoundSquare';
import ToggleBox from '@components/common/ToggleBox';
import ToggleButton from '@components/common/ToggleButton';
import React, { ChangeEvent, useRef, useState } from 'react';
import { ToggleControlRef } from 'types/etc';
import { EssentialNotion, RelevanceNotion } from 'types/notion';

interface RelevanceInputToggleProps {
  isChecked: boolean;
  originNotionName: string;
  notion: RelevanceNotion;
  toggleCheckbox: () => void;
  setRelevance: (relevance: string) => void;
  setReverseRelevance: (relevance: string) => void;
}

export default function RelevanceInputToggle({
  isChecked,
  originNotionName,
  notion,
  toggleCheckbox,
  setRelevance,
  setReverseRelevance,
}: RelevanceInputToggleProps) {
  const [toggleOpen, setToggleOpen] = useState(true);
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
    <div className="flex">
      <button className="flex items-stretch w-full" onClick={toggleCheckbox}>
        <Checkbox isChecked={isChecked} />
        <p className="w-full mx-3 ">{notion.name}</p>
      </button>
      <ToggleButton
        isOpened={toggleOpen}
        onClick={() => {
          setToggleOpen((prev) => !prev);
        }}
      />
    </div>
  );

  const toggleChildren = (
    <div className="flex flex-col gap-3 text-sm pt-3">
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
      isOpen={toggleOpen}
      children={children}
      toggleChildren={toggleChildren}
    />
  );
}
