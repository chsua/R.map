'use client';

import { useEffect, useState } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';
import CircleLine from '@components/common/CircleLine';
import Description from '@components/common/Description';
import Title from '@components/common/Title';
import NotionList from '@components/item/NotionList';

import { useMovePage } from 'hooks/useMovePage';

import { GET_URL } from 'constants/url';
import { getFetch } from 'utils/fetch';
import { Notion } from 'types/notion';
import NotionItem from '@components/item/NotionItem';
import PlusNotionButton from '@components/item/PlusNotionButton';
import { useModal } from 'hooks/useModal';
import BottomSheet from '@components/common/BottomSheet';
import NotionForm from '@components/item/NotionForm';

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion>();
  const [trigger, setTrigger] = useState(0);

  const { updateRecentlyNotionList } = useRecentlyNotionContext();
  const { moveNotionItemPage } = useMovePage();

  const url = GET_URL.NOTION_ITEM(params.id);

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

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
      const data = await getFetch<Notion>(url);
      setData(data);
      updateRecentlyNotionList(
        { id: data.id, name: data.name },
        data.id,
        data.relatedNotions,
      );
    })();
  }, [trigger]);

  return (
    data && (
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <Title content={data.name} />
          <CircleLine amount={8} />
          <div className="min-h-[150px]">
            <Description content={data.content} />
          </div>
        </div>
        <NotionList>
          {data.relatedNotions.map((item) => {
            return (
              <li key={item.name}>
                <NotionItem
                  content={item.name}
                  handleMoreMenuButtonClick={openBottomSheetForNotion}
                  handleNotionItemClick={() => handleNotionItemClick(item.id)}
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
