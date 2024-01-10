'use client';

import { useEffect, useState } from 'react';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { useMovePage } from 'hooks/useMovePage';

import { NotionFolder } from 'types/notion';
import { getFetch } from 'utils/fetch';
import { GET_URL } from 'constants/url';
import { useModal } from 'hooks/useModal';

import BottomSheet from '@components/common/BottomSheet';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';
import FolderForm from '@components/item/FolderForm';
import NotionInfo from '@components/item/NotionInfo';
import { deleteNotionFolder } from 'utils/deleteNotion';

export default function Home() {
  const [data, setData] = useState<NotionFolder[]>();
  const [trigger, setTrigger] = useState(0);
  const { moveNotionFolderItemListPage } = useMovePage();

  const {
    open: openSubmitButtonBottomSheet,
    close: closeSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotionSubmit = (notionFolder?: NotionFolder) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitSubmitButtonBottomSheet()}>
        <div className="py-7 w-full">
          <FolderForm
            data={notionFolder}
            subEvent={() => {
              setTrigger((trigger) => trigger + 1);
              exitSubmitButtonBottomSheet();
            }}
          />
        </div>
      </BottomSheet>
    ));
  };

  //현재 exit로 해서 페이드 아웃 애니메이션 적용 안됨
  const {
    open: openMoreButtonBottomSheet,
    close: closeMoreButtonBottomSheet,
    exit: exitMoreButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotion = (notionFolder: NotionFolder) => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitMoreButtonBottomSheet()}>
        <div className="py-7 w-full">
          <NotionInfo notion={notionFolder}>
            <button
              className="flex gap-3 items-center text-sm"
              onClick={() => {
                exitMoreButtonBottomSheet();
                openBottomSheetForNotionSubmit(notionFolder);
              }}
            >
              <CircleLine amount={1} />
              <span>이름 수정하기</span>
            </button>
            <button
              className="flex gap-3 items-center text-sm"
              onClick={() => {
                deleteNotionFolder(notionFolder.id, () => {
                  exitMoreButtonBottomSheet();
                  setTrigger((trigger) => trigger + 1);
                });
              }}
            >
              <CircleLine amount={1} />
              <span>폴더 삭제하기</span>
            </button>
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<NotionFolder[]>(GET_URL.NOTION_FOLDER_LIST());

      setData(data);
    })();
  }, [trigger]);

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
