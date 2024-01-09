'use client';

import { useEffect, useState } from 'react';

import NotionList from '@components/item/NotionList';
import Title from '@components/common/Title';
import CircleLine from '@components/common/CircleLine';

import { useMovePage } from 'hooks/useMovePage';

import { EssenceNotion } from 'types/notion';
import { getFetch } from 'utils/fetch';
import { GET_URL } from 'constants/url';
import { useModal } from 'hooks/useModal';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';

export default function Home() {
  const [data, setData] = useState<EssenceNotion[]>();
  const [trigger, setTrigger] = useState(0);
  const { moveNotionFolderItemListPage } = useMovePage();

  const { open: openMoreButtonBottomSheet, exit: exitMoreButtonBottomSheet } =
    useModal();
  const openBottomSheetForNotion = () => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitMoreButtonBottomSheet()}>
        여기에 노션 정보
      </BottomSheet>
    ));
  };

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotionSubmit = () => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <NotionForm
          subEvent={() => {
            setTrigger((trigger) => trigger + 1);
            exitSubmitButtonBottomSheet();
          }}
        />
      </BottomSheet>
    ));
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<EssenceNotion[]>(
        GET_URL.NOTION_FOLDER_LIST(),
      );

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
                  handleMoreMenuButtonClick={openBottomSheetForNotion}
                  handleNotionItemClick={() =>
                    moveNotionFolderItemListPage(item.id)
                  }
                />
              </li>
            );
          })}
          <li>
            <PlusNotionButton onClick={openBottomSheetForNotionSubmit} />
          </li>
        </NotionList>
      </main>
    )
  );
}
