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

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Notion>();
  const [trigger, setTrigger] = useState(0);

  const { updateNowNotionFolder ,updateRecentlyNotionList } = useRecentlyNotionContext();
  const { moveNotionItemPage, moveMainPage } = useMovePage();

  const url = GET_URL.NOTION_ITEM(params.id);

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

  useEffect(() => {
    (async () => {
      const data = await getFetch<Notion>(url);
      setData(data);
      updateRecentlyNotionList(
        { id: data.id, name: data.name },
        data.id,
        data.relatedNotions,
      );
      updateNowNotionFolder({
        id: data.notionFolder.id,
        name: data.notionFolder.name,
      });
    })();
  }, [trigger]);

  if (!data) {
    return <></>;
  }

  const openBottomSheetForNotionSubmit = (notion?: Notion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <NotionForm
          notionFolderId={data.notionFolder.id}
          data={notion}
          relatedNotionId={params.id}
          subEvent={() => {
            setTrigger((trigger) => trigger + 1);
            exitSubmitButtonBottomSheet();
          }}
        />
      </BottomSheet>
    ));
  };

  const openBottomSheetForNotion = (notion: Notion) => {
    openNotionMoreButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet
        size="free"
        closeEvent={() => exitNotionMoreButtonBottomSheet()}
      >
        <div className="py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'개념 수정하기'}
              handleButtonClick={() => {
                exitNotionMoreButtonBottomSheet();
                openBottomSheetForNotionSubmit(data);
              }}
            />
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => {
                deleteNotion(notion.id, () => {
                  exitNotionMoreButtonBottomSheet();
                  setTrigger((trigger) => trigger + 1);
                  //지금 노션에 소속폴더 id가 없어서 홈페이지로 이동. 추후 폴더로 이동 예정
                  if (notion.id === data?.id) moveMainPage();
                });
              }}
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
        <div className="py-7 w-full">
          <NotionInfo notion={notion}>
            <ButtonWithCircle
              text={'연결 관계 끊기'}
              handleButtonClick={() => {
                alert('준비중인 기능입니다.');
              }}
            />
            <ButtonWithCircle
              text={'개념 삭제하기'}
              handleButtonClick={() => {
                deleteNotion(notion.id, () => {
                  exitRelatedNotionMoreButtonBottomSheet();
                  setTrigger((trigger) => trigger + 1);
                });
              }}
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
            <Title content={data.name} />
            <CircleLine amount={8} />
          </div>
          <MoreMenuButton
            direction="column"
            size="sm"
            onClick={() => openBottomSheetForNotion(data)}
          />
        </div>
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
                handleMoreMenuButtonClick={() =>
                  openBottomSheetForRelatedNotion(item)
                }
                handleNotionItemClick={() => handleNotionItemClick(item.id)}
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
