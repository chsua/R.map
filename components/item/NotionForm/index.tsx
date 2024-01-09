'use client';

import RoundSquare from '@components/common/RoundSquare';
import {
  NOTION_CONTENT_AMOUNT,
  NOTION_TITLE_AMOUNT,
} from 'constants/amountLimit';
import { POST_URL } from 'constants/url';
import React, { FormEventHandler, useState } from 'react';
import { Notion, RequestNotion } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

interface NotionFormProps {
  data?: Notion;
  subEvent?: () => void;
}

/**
 * 사용처
 * 1. 노션 생성
 * 2. 노션 수정
 */
export default function NotionForm({ data, subEvent }: NotionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const submitNotionItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (title.length < 1 || title.length > NOTION_TITLE_AMOUNT) return;
    if (content.length < 1 || content.length > NOTION_CONTENT_AMOUNT) return;

    const submitData: RequestNotion = {
      name: title,
      content: content,
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
        subEvent && subEvent();
      })
      .catch(() => {
        alert('개념 추가가 실패했습니다. 다시 확인해주세요.');
      });
  };

  return (
    <form
      className="w-[90%] h-[90%] flex gap-3 flex-col"
      onSubmit={submitNotionItem}
    >
      <div>
        <RoundSquare size="sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="개념을 입력해주세요"
            className="bg-transparent w-full p-3 focus:outline-none"
          />
        </RoundSquare>
        <p className="w-[98%] m-auto flex justify-between">
          <span className="text-red-700">
            {title.length > NOTION_TITLE_AMOUNT &&
              `${NOTION_TITLE_AMOUNT} 이내로 입력해주세요`}
          </span>
          <span className="text-gray-600">
            {title.length}/{NOTION_TITLE_AMOUNT}
          </span>
        </p>
      </div>
      <div>
        <RoundSquare size="free">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="개념 설명을 입력해주세요"
            className="bg-transparent w-full resize-none h-[calc(35vh-110px)] p-3  focus:outline-none"
          />
        </RoundSquare>
        <p className="w-[98%] m-auto flex justify-between">
          <span className="text-red-700">
            {content.length > NOTION_CONTENT_AMOUNT &&
              `${NOTION_CONTENT_AMOUNT} 이내로 입력해주세요`}
          </span>
          <span className="text-gray-600">
            {content.length}/{NOTION_CONTENT_AMOUNT}
          </span>
        </p>
      </div>
      <RoundSquare>
        <button type="submit" className="w-full h-full">
          확 인
        </button>
      </RoundSquare>
    </form>
  );
}
