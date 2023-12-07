'use client';

import RoundSquare from '@components/common/RoundSquare';
import { POST_URL } from 'constants/url';
import { useMovePage } from 'hooks/useMovePage';
import React, { FormEventHandler, LegacyRef, useRef } from 'react';
import { Notion, RequestNotion } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

interface NotionFormProps {
  type: 'make' | 'edit';
  data?: Notion;
  submitEvent?: () => void;
}

/**
 * 사용처
 * 1. 새로운 개념 생성
 *    - 첫 노션그래프 생성
 *    - 노션 생성
 * 2. 노션 수정
 *
 * 필요한 데이터
 * 1. 새로운 개념 생성
 *    - 첫 노션그래프 생성 : 없음
 *    - 노션 생성 : 현재 노션 id
 * 2. 노션 수정 : 핸재 노션 모든 정보
 */
export default function NotionForm({
  type,
  data,
  submitEvent,
}: NotionFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const { moveNotionItemPage } = useMovePage();
  const submitNotionItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!titleRef.current || !contentRef.current) return;

    const submitData: RequestNotion = {
      name: titleRef.current.value,
      content: contentRef.current.value,
      relatedNotion: {
        id: data ? data.id : null,
      },
    };

    fetchWithoutGet<RequestNotion, { id: number }>(
      POST_URL.NOTION_ITEM(),
      'post',
      submitData,
    )
      .then((res) => {
        console.log(res.id);
        // 실제 서버에서는 활성화 moveNotionItemPage(res.id);
        submitEvent && submitEvent();
      })
      .catch(() => {
        alert('개념 추가가 실패했습니다. 다시 확인해주세요.');
      });
  };

  return (
    <form
      className="w-[90%] h-[90%] flex gap-5 flex-col"
      onSubmit={submitNotionItem}
    >
      <RoundSquare size="sm">
        <input
          ref={titleRef}
          placeholder="개념을 입력해주세요"
          className="bg-transparent w-full p-3 focus:outline-none"
        />
      </RoundSquare>
      <RoundSquare size="free">
        <textarea
          ref={contentRef}
          placeholder="개념 설명을 입력해주세요"
          className="bg-transparent w-full resize-none h-[calc(35vh-110px)] p-3  focus:outline-none"
        />
      </RoundSquare>
      <RoundSquare>
        <button type="submit" className="w-full h-full">
          확 인
        </button>
      </RoundSquare>
    </form>
  );
}
