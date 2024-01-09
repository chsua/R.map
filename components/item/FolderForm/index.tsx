'use client';

import RoundSquare from '@components/common/RoundSquare';
import { NOTION_TITLE_AMOUNT } from 'constants/amountLimit';
import { POST_URL } from 'constants/url';
import React, { FormEventHandler, useState } from 'react';
import { Notion, RequestNotion, RequestNotionFolder } from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

interface FolderFormProps {
  data?: Notion;
  subEvent?: () => void;
}

/**
 * 사용처
 * 1. 새로운 폴더 생성
 * 2. 폴더 수정
 */
export default function FolderForm({ data, subEvent }: FolderFormProps) {
  const [title, setTitle] = useState('');

  const submitNotionItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (title.length < 1 || title.length > NOTION_TITLE_AMOUNT) return;

    const submitData: RequestNotionFolder = {
      name: title,
    };

    fetchWithoutGet<RequestNotionFolder, { id: number }>(
      POST_URL.NOTION_FOLDER(),
      'post',
      submitData,
    )
      .then((res) => {
        console.log(res.id);
        subEvent && subEvent();
      })
      .catch(() => {
        alert('추가를 실패했습니다. 다시 확인해주세요.');
      });
  };

  return (
    <form
      className="w-[90%] h-[90%] flex gap-10 flex-col m-auto"
      onSubmit={submitNotionItem}
    >
      <div>
        <RoundSquare size="sm">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="학습할 분야를 입력해주세요"
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
      <RoundSquare>
        <button type="submit" className="w-full h-full">
          확 인
        </button>
      </RoundSquare>
    </form>
  );
}
