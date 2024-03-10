'use client';

import CircleLine from '@components/common/CircleLine';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useMovePage } from 'hooks/useMovePage';

import { EssentialNotion, Notion } from 'types/notion';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';
import { useModal } from 'hooks/useModal';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';
import NotionInfo from '@components/item/NotionInfo';
import ButtonWithCircle from '@components/common/ButtonWithCircle';
import { useGetNotionListInfolder } from 'hooks/query/useGetNotionListInfolder';
import { useDeleteNotion } from 'hooks/query/useDeleteNotion';
import NotionListForEditRelevance from '@components/item/NotionListForEditRelevance';
import { useEffect, useState } from 'react';
import { useGetGraphList } from 'hooks/query/useGetGraphList';
import { useToastContext } from '@components/context/toast';
import { useSplitFolder } from 'hooks/query/useSplitFolder';

export default function Page({ params }: { params: { id: number } }) {
  const { moveNotionItemPage } = useMovePage();
  const { data: notionList } = useGetNotionListInfolder(params.id);
  const { data: graphList = [] } = useGetGraphList(params.id);
  const { addMessage } = useToastContext();
  const graphData = new Map();
  graphList?.forEach(({ notionIds }, index) =>
    notionIds.forEach((notionId) => graphData.set(notionId, index)),
  );
  const [hoverGraphId, setHoverGraphId] = useState<number | null>(null);
  const [targetName, setTargetName] = useState('');
  const [isSplitFolderMode, setIsSplitFolderMode] = useState(false);
  const { mutate: splitFolder } = useSplitFolder(params.id);

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const { open: openMoreButtonBottomSheet, exit: exitMoreButtonBottomSheet } =
    useModal();
  const { open: openEditRelevanceSheet, exit: exitEditRelevanceSheet } =
    useModal();

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

  const { mutate: deleteNotion } = useDeleteNotion(
    params.id,
    exitMoreButtonBottomSheet,
  );

  if (!notionList) {
    return <></>;
  }

  const openBottomSheetForRelevanceEdit = (notion: EssentialNotion) => {
    if (notionList.notions.length === 1)
      return addMessage('관계수정 기능은 개념이 2개 이상일 때 가능합니다.');

    openEditRelevanceSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitEditRelevanceSheet()}>
        <p className="text-lg font-medium text-left w-[90%] pt-8">
          "{notion.name}"의 연관관계 수정하기
        </p>
        <NotionListForEditRelevance
          notionId={notion.id}
          folderId={params.id}
          notionListInFolder={notionList.notions}
          exitBottomSheet={exitEditRelevanceSheet}
        />
      </BottomSheet>
    ));
  };

  const openBottomSheetForNotionSubmit = (notion?: Notion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <div className="my-5 py-7 w-full flex justify-center">
          <NotionForm
            notionFolderId={notionList.id}
            data={notion}
            subEvent={() => {
              exitSubmitButtonBottomSheet();
            }}
          />
        </div>
      </BottomSheet>
    ));
  };

  const openBottomSheetForNotion = (notion: EssentialNotion) => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitMoreButtonBottomSheet()}>
        <div className="py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => {
                deleteNotion(notion.id);
              }}
            />
            <ButtonWithCircle
              text={'연관 개념 수정하기'}
              handleButtonClick={() => {
                exitMoreButtonBottomSheet();
                openBottomSheetForRelevanceEdit(notion);
              }}
            />
            <ButtonWithCircle
              text={'폴더 분리하기'}
              handleButtonClick={() => {
                exitMoreButtonBottomSheet();
                setIsSplitFolderMode(true);
              }}
            />
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  return (
    <main className="flex flex-col gap-5">
      <Title content={(notionList && notionList.name) ?? '무제'} />
      <CircleLine amount={8} />
      <NotionList style="md:grid-cols-2 lg:grid-cols-3">
        {notionList.notions.map((item) => {
          return (
            <li
              key={item.name}
              onMouseOver={() => {
                graphData.size > 0 && setHoverGraphId(graphData.get(item.id));
              }}
              onMouseOut={() => {
                graphData.size > 0 && setHoverGraphId(null);
              }}
            >
              <NotionItem
                color={
                  graphData.size > 0 && graphData.get(item.id) === hoverGraphId
                    ? isSplitFolderMode
                      ? 'lightOrange'
                      : 'lightBlue'
                    : 'default'
                }
                content={item.name}
                handleMoreMenuButtonClick={
                  isSplitFolderMode
                    ? undefined
                    : () => openBottomSheetForNotion(item)
                }
                handleNotionItemClick={
                  isSplitFolderMode
                    ? () => {
                        if (targetName === '') return;

                        splitFolder({
                          notionId: item.id,
                          data: { name: targetName },
                        });
                      }
                    : () => handleNotionItemClick(item.id)
                }
              />
            </li>
          );
        })}
        <li>
          <PlusNotionButton onClick={() => openBottomSheetForNotionSubmit()} />
        </li>
      </NotionList>
      {isSplitFolderMode && (
        <div>
          <span className="text-lg font-bold mr-2">
             ❐ 분리하고자 하는 폴더 이름을 짓고 개념집합을 선택해주세요.
          </span>
          <button
            type="button"
            className="bg-slate-200 px-2 rounded-md text-sm"
            onClick={() => setIsSplitFolderMode(false)}
          >
            편집모드 해제
          </button>
          <br />
          <span className="text-lg font-bold mr-2">
             ❐ 분리하는 폴더의 이름 :
          </span>
          <input
            className="border-2 rounded-md text-sm border-slate-400 px-1 mt-3 mr-2"
            value={targetName}
            onChange={(e) => setTargetName(e.target.value)}
          />
        </div>
      )}
    </main>
  );
}
