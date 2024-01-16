'use client';

import { useEffect, useState } from 'react';

import CircleLine from '@components/common/CircleLine';
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
import NotionInfo from '@components/item/NotionInfo';
import { deleteNotion } from 'utils/deleteNotion';
import ButtonWithCircle from '@components/common/ButtonWithCircle';

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion[]>();
  const [trigger, setTrigger] = useState(0);

  const { moveNotionItemPage } = useMovePage();

  const url = GET_URL.NOTION_LIST_IN_FOLDER(params.id);

  const handleNotionItemClick = (id: number) => {
    moveNotionItemPage(id);
  };

  const {
    open: openSubmitButtonBottomSheet,
    exit: exitSubmitButtonBottomSheet,
  } = useModal();
  const openBottomSheetForNotionSubmit = (notion?: Notion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <NotionForm
          data={notion}
          subEvent={() => {
            setTrigger((trigger) => trigger + 1);
            exitSubmitButtonBottomSheet();
          }}
        />
      </BottomSheet>
    ));
  };

  const { open: openMoreButtonBottomSheet, exit: exitMoreButtonBottomSheet } =
    useModal();
  const openBottomSheetForNotion = (notion: Notion) => {
    openMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitMoreButtonBottomSheet()}>
        <div className="py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => {
                deleteNotion(notion.id, () => {
                  exitMoreButtonBottomSheet();
                  setTrigger((trigger) => trigger + 1);
                });
              }}
            />
            <ButtonWithCircle
              text={'연관 개념 수정하기'}
              handleButtonClick={() => {
                alert('아직 준비 중인 기능입니다.');
                //다른 바텀시트 만들어서 연관개념 셀렉터로 선택하도록 작성
              }}
            />
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  useEffect(() => {
    (async () => {
      const data = await getFetch<Notion[]>(url);
      setData(data);
    })();
  }, [trigger]);

  return (
    data && (
      <main className="flex flex-col gap-5">
        <Title content={data && data[0] ? data[0].name : 'empty...'} />
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
                  handleNotionItemClick={() => handleNotionItemClick(item.id)}
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
