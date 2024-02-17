'use client';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { useMovePage } from 'hooks/useMovePage';

import { EssentialNotion, NotionFolder } from 'types/notion';

import { useModal } from 'hooks/useModal';

import BottomSheet from '@components/common/BottomSheet';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';
import FolderForm from '@components/item/FolderForm';
import NotionInfo from '@components/item/NotionInfo';
import { deleteNotionFolder } from 'utils/deleteNotion';
import ButtonWithCircle from '@components/common/ButtonWithCircle';
import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';
import { useGetNotionFolderList } from 'hooks/query/useGetNotionFolderList';
import { useEffect } from 'react';

export default function Home() {
  const { data, refetch } = useGetNotionFolderList();

  const { moveNotionFolderItemListPage } = useMovePage();
  const { resetAllData } = useRecentlyNotionContext();

  useEffect(() => {
    resetAllData();
  }, []);

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotionSubmit = (notionFolder?: EssentialNotion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitSubmitButtonBottomSheet()}>
        <div className="py-7 w-full">
          <FolderForm
            data={notionFolder}
            subEvent={() => {
              refetch();
              exitSubmitButtonBottomSheet();
            }}
          />
        </div>
      </BottomSheet>
    ));
  };

  //현재 exit로 해서 페이드 아웃 애니메이션 적용 안됨
  const { open: openMoreButtonBottomSheet, exit: exitMoreButtonBottomSheet } =
    useModal();
  const openBottomSheetForNotion = (notionFolder: NotionFolder) => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitMoreButtonBottomSheet()}>
        <div className="py-7 w-full">
          <NotionInfo notion={notionFolder}>
            <ButtonWithCircle
              text={'이름 수정하기'}
              handleButtonClick={() => {
                exitMoreButtonBottomSheet();
                openBottomSheetForNotionSubmit(notionFolder);
              }}
            />
            <ButtonWithCircle
              text={'폴더 삭제하기'}
              handleButtonClick={() => {
                deleteNotionFolder(notionFolder.id, () => {
                  exitMoreButtonBottomSheet();
                  refetch();
                });
              }}
            />
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  return (
    data && (
      <main className="flex flex-col gap-5">
        <Title content="R:map" />
        <CircleLine amount={8} />
        <NotionList style="md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => {
            return (
              <li key={item.name}>
                <NotionItem
                  content={item.name}
                  handleMoreMenuButtonClick={() =>
                    openBottomSheetForNotion(item)
                  }
                  handleNotionItemClick={() =>
                    moveNotionFolderItemListPage(item.id)
                  }
                />
              </li>
            );
          })}
          <li>
            <PlusNotionButton
              onClick={() => openBottomSheetForNotionSubmit()}
            />
          </li>
        </NotionList>
      </main>
    )
  );
}
