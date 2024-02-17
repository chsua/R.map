'use client';

import { useEffect, useRef, useState } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';
import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useMovePage } from 'hooks/useMovePage';

import { GET_URL } from 'constants/url';
import { getFetch } from 'utils/fetch';
import { Notion, EssentialNotion } from 'types/notion';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';
import { useModal } from 'hooks/useModal';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';
import NotionInfo from '@components/item/NotionInfo';
import { deleteNotion } from 'utils/deleteNotion';
import ButtonWithCircle from '@components/common/ButtonWithCircle';
import MoreMenuButton from '@components/common/MoreMenuButton';
import { useGetNotion } from 'hooks/query/useGetNotion';
import { useDeleteNotion } from 'hooks/query/useDeleteNotion';
import ToggleBox from '@components/common/ToggleBox';
import ToggleButton from '@components/common/ToggleButton';
import { ToggleControlRef } from 'types/etc';

export default function Page({ params }: { params: { id: number } }) {
  const { data: notionData } = useGetNotion(params.id);
  const [relevanceNotionList, setRelevanceNotionList] = useState(
    notionData?.relatedNotions.map((info) => ({ ...info, isOpen: false })) ??
      [],
  );
  const { updateNowNotionFolder, updateRecentlyNotionList } =
    useRecentlyNotionContext();
  const { moveNotionItemPage, moveNotionFolderItemListPage } = useMovePage();

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();

  const {
    open: openNotionMoreButtonBottomSheet,
    exit: exitNotionMoreButtonBottomSheet,
  } = useModal();

  const {
    open: openRelatedNotionMoreButtonBottomSheet,
    exit: exitRelatedNotionMoreButtonBottomSheet,
  } = useModal();

  const toggleRelevanceArea = (id: number) => {
    setRelevanceNotionList((prev) =>
      prev.map((info) => {
        return info.id === id ? { ...info, isOpen: !info.isOpen } : info;
      }),
    );
  };

  useEffect(() => {
    if (notionData) {
      updateRecentlyNotionList(
        { id: notionData.id, name: notionData.name },
        notionData.id,
        notionData.relatedNotions,
      );
      updateNowNotionFolder({
        id: notionData.notionFolder.id,
        name: notionData.notionFolder.name,
      });
    }
  }, []);

  const { mutate: deleteOriginNotion } = useDeleteNotion(params.id, () => {
    exitNotionMoreButtonBottomSheet();
    notionData && moveNotionFolderItemListPage(notionData.notionFolder.id);
  });
  const { mutate: deleteRelevanceNotion } = useDeleteNotion(params.id, () => {
    exitRelatedNotionMoreButtonBottomSheet();
  });

  if (!notionData) {
    return <></>;
  }

  const openBottomSheetForNotionSubmit = (notion?: Notion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <div className="my-5 py-7 w-full flex justify-center">
          <NotionForm
            notionFolderId={notionData.notionFolder.id}
            data={notion}
            relatedNotion={{ id: notionData.id, name: notionData.name }}
            subEvent={() => {
              exitSubmitButtonBottomSheet();
            }}
          />
        </div>
      </BottomSheet>
    ));
  };

  const openBottomSheetForNotion = (notion: Notion) => {
    openNotionMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet
        size="free"
        closeEvent={() => exitNotionMoreButtonBottomSheet()}
      >
        <div className="my-5 py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'개념 수정하기'}
              handleButtonClick={() => {
                exitNotionMoreButtonBottomSheet();
                openBottomSheetForNotionSubmit(notionData);
              }}
            />
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => deleteOriginNotion(notion.id)}
            />
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  const openBottomSheetForRelatedNotion = (notion: EssentialNotion) => {
    openRelatedNotionMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet
        size="free"
        closeEvent={() => exitRelatedNotionMoreButtonBottomSheet()}
      >
        <div className="my-5 py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'연결 관계 끊기'}
              handleButtonClick={() => {
                alert('준비중인 기능입니다.');
              }}
            />
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => deleteRelevanceNotion(notion.id)}
            />
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  return (
    <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <Title content={notionData.name} />
            <CircleLine amount={8} />
          </div>
          <MoreMenuButton
            direction="column"
            size="sm"
            onClick={() => openBottomSheetForNotion(notionData)}
          />
        </div>
        <div className="min-h-[150px]">
          <Description content={notionData.content} />
        </div>
      </div>
      <NotionList>
        {relevanceNotionList.map((item) => {
          return (
            <li
              key={item.name}
              className="border-2 border-slate-100 rounded-lg"
            >
              <ToggleBox
                isOpen={item.isOpen}
                children={
                  <NotionItem
                    content={item.name}
                    handleMoreMenuButtonClick={() =>
                      openBottomSheetForRelatedNotion(item)
                    }
                    handleNotionItemClick={() => handleNotionItemClick(item.id)}
                    handleToggleButtonClick={() => toggleRelevanceArea(item.id)}
                  />
                }
                toggleChildren={
                  <p className="text-sm px-5 py-3 gap-2 text-slate-800">
                    {item.relevance}
                  </p>
                }
              />
            </li>
          );
        })}
        <li>
          <PlusNotionButton onClick={() => openBottomSheetForNotionSubmit()} />
        </li>
      </NotionList>
    </main>
  );
}
