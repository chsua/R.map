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
import { useState } from 'react';

export default function Page({ params }: { params: { id: number } }) {
  const { moveNotionItemPage } = useMovePage();
  const { data } = useGetNotionListInfolder(params.id);

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

  if (!data) {
    return <></>;
  }

  const openBottomSheetForRelevanceEdit = (notion: EssentialNotion) => {
    openEditRelevanceSheet(({ isOpen, close }) => (
      <BottomSheet size="free" closeEvent={() => exitEditRelevanceSheet()}>
        <p className="text-lg font-medium text-left w-[90%] pt-8">
          "{notion.name}"의 연관관계 수정하기
        </p>
        <NotionListForEditRelevance
          notionId={notion.id}
          notionListInFolder={data.notions}
        />
      </BottomSheet>
    ));
  };

  const openBottomSheetForNotionSubmit = (notion?: Notion) => {
    openSubmitButtonBottomSheet(({ isOpen, close }) => (
      <BottomSheet closeEvent={() => exitSubmitButtonBottomSheet()}>
        <div className="my-5 py-7 w-full flex justify-center">
          <NotionForm
            notionFolderId={data.id}
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
          </NotionInfo>
        </div>
      </BottomSheet>
    ));
  };

  return (
    <main className="flex flex-col gap-5">
      <Title content={(data && data.name) ?? '무제'} />
      <CircleLine amount={8} />
      <NotionList style="md:grid-cols-2 lg:grid-cols-3">
        {data.notions.map((item) => {
          return (
            <li key={item.name}>
              <NotionItem
                content={item.name}
                handleMoreMenuButtonClick={() => openBottomSheetForNotion(item)}
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
