import { useGetNotion } from 'hooks/query/useGetNotion';
import { EssentialNotion, RequestRelatedNotion } from 'types/notion';
import RelevanceInputToggle from '../RelevanceInputToggle';
import Checkbox from '@components/common/Checkbox';
import RoundSquare from '@components/common/RoundSquare';
import { MouseEvent, useRef, useState } from 'react';
import { useEditRelatedNotion } from 'hooks/query/useEditRelatedNotion';

interface NotionListForEditRelevanceProps {
  notionId: number;
  notionListInFolder: EssentialNotion[];
  exitBottomSheet?: () => void;
}

/**
 *
 * notionId: 주가 되는 노션,
 * notionListInFolder: 주가 되는 노션이 포함된 폴더의 모든 노션 리스트,
 */
export default function NotionListForEditRelevance({
  notionId,
  notionListInFolder,
  exitBottomSheet,
}: NotionListForEditRelevanceProps) {
  const { data: notion } = useGetNotion(notionId);
  const { mutate } = useEditRelatedNotion(notionId, exitBottomSheet);
  if (!notion) {
    return <></>;
  }

  const relatedNotionList = new Map(
    notion.relatedNotions.map((info) => [info.id, info]),
  );
  const resultList = notionListInFolder.map((notionInfo) => {
    const notion = relatedNotionList.get(notionInfo.id);

    return notion
      ? { ...notion, isChecked: true }
      : {
          ...notionInfo,
          isChecked: false,
          relevance: '',
          reverseRelevance: '',
        };
  });
  const [notionList, setNotionList] = useState(resultList);
  const initRefData: Record<number, RequestRelatedNotion> = {};
  notionList.forEach(({ id, relevance, reverseRelevance }) => {
    initRefData[id] = {
      id,
      relevance: relevance ?? '',
      reverseRelevance: reverseRelevance ?? '',
    };
  });

  const notionRef = useRef<Record<number, RequestRelatedNotion>>(initRefData);

  const changeRelevance =
    (id: number, type: 'relevance' | 'reverseRelevance') =>
    (relevance: string) => {
      const newData = { ...notionRef.current[id], [type]: relevance };

      notionRef.current = { ...notionRef.current, [id]: newData };
    };

  const toggleCheckbox = (id: number) => () => {
    setNotionList((prev) => {
      return prev.map((info) =>
        info.id === id ? { ...info, isChecked: !info.isChecked } : info,
      );
    });
  };

  const submitRelevanceListForEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const result: RequestRelatedNotion[] = [];
    notionList.forEach((notion) => {
      if (!notion.isChecked) return;

      result.push(notionRef.current[notion.id]);
    });

    mutate(result);
  };

  return (
    <div className="w-[95%] py-7 flex flex-col gap-2 px-3">
      {notionList.map((targetNotion) => {
        if (targetNotion.id === notion.id) return <></>;

        if (targetNotion.isChecked) {
          return (
            <div className="border-2 border-slate-200 rounded-lg p-3">
              <RelevanceInputToggle
                isChecked={targetNotion.isChecked}
                key={targetNotion.id}
                originNotionName={notion.name}
                notion={targetNotion}
                toggleCheckbox={toggleCheckbox(targetNotion.id)}
                setRelevance={changeRelevance(targetNotion.id, 'relevance')}
                setReverseRelevance={changeRelevance(
                  targetNotion.id,
                  'reverseRelevance',
                )}
              />
            </div>
          );
        }

        return (
          <button
            className="flex  border-2 border-slate-200 rounded-lg px-3 items-stretch"
            key={targetNotion.id}
            onClick={toggleCheckbox(targetNotion.id)}
          >
            <Checkbox isChecked={false} />
            <p className="w-full py-3 mx-3">{targetNotion.name}</p>
          </button>
        );
      })}
      <RoundSquare size="sm" color="lightBlue">
        <button
          type="button"
          className="w-full h-full"
          onClick={submitRelevanceListForEdit}
        >
          수정하기
        </button>
      </RoundSquare>
    </div>
  );
}
