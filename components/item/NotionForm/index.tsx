'use client';

import RoundSquare from '@components/common/RoundSquare';
import {
  NOTION_CONTENT_AMOUNT,
  NOTION_RELEVANCE,
  NOTION_TITLE_AMOUNT,
} from 'constants/amountLimit';
import { PATCH_URL, POST_URL } from 'constants/url';
import { usePatchNotion } from 'hooks/query/usePatchNotion';
import { usePostNotion } from 'hooks/query/usePostNotion';
import React, { FormEventHandler, useEffect, useState } from 'react';
import {
  EssentialNotion,
  Notion,
  RequestNotionForPatch,
  RequestNotionForPost,
} from 'types/notion';
import { fetchWithoutGet } from 'utils/fetch';

interface NotionFormProps {
  notionFolderId: number;
  data?: Notion;
  relatedNotion?: EssentialNotion;
  subEvent?: () => void;
}

/**
 * 사용처
 * 1. 노션 생성
 *     - 관련 노션 없는 노션 생성
 *     - 관련 노션 있는 노션 생성
 * 2. 노션 수정
 */
export default function NotionForm({
  notionFolderId,
  data,
  relatedNotion,
  subEvent,
}: NotionFormProps) {
  const [title, setTitle] = useState(data ? data.name : '');
  const [content, setContent] = useState(data ? data.content : '');
  const [relevance, setRelevance] = useState('');
  const [reverseRelevance, setReverseRelevance] = useState('');
  const { mutate: postNotion } = usePostNotion(
    relatedNotion ? 'notion' : 'folder',
    relatedNotion ? relatedNotion.id : notionFolderId,
    subEvent,
  );
  const patchNotion = data && usePatchNotion(data.id, subEvent);

  const submitNotionItem: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (title.length < 1 || title.length > NOTION_TITLE_AMOUNT) return;
    if (content.length < 1 || content.length > NOTION_CONTENT_AMOUNT) return;

    if (data) {
      patchNotion?.mutate({ name: title, content });
    } else {
      const submitData: RequestNotionForPost = {
        name: title,
        content: content,
        notionFolderId: notionFolderId,
        relatedNotion: relatedNotion
          ? {
              id: relatedNotion.id,
              relevance,
              reverseRelevance,
            }
          : null,
      };

      postNotion(submitData);
    }
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
            className="bg-transparent w-full p-3"
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
      {data?.id !== relatedNotion?.id && (
        <>
          <div>
            <RoundSquare size="free">
              <input
                value={relevance}
                onChange={(e) => setRelevance(e.target.value)}
                placeholder={`"${title}"에게 "${relatedNotion?.name}"란?`}
                className="bg-transparent w-full resize-none h-10 p-3 "
              />
            </RoundSquare>
            <p className="w-[98%] m-auto flex justify-between">
              <span className="text-red-700">
                {relevance.length > NOTION_RELEVANCE &&
                  `${NOTION_RELEVANCE} 이내로 입력해주세요`}
              </span>
              <span className="text-gray-600">
                {relevance.length}/{NOTION_RELEVANCE}
              </span>
            </p>
          </div>
          <div>
            <RoundSquare size="free">
              <input
                value={reverseRelevance}
                onChange={(e) => setReverseRelevance(e.target.value)}
                placeholder={`"${relatedNotion?.name}"에게 "${title}"란?`}
                className="bg-transparent w-full resize-none h-10 p-3 "
              />
            </RoundSquare>
            <p className="w-[98%] m-auto flex justify-between">
              <span className="text-red-700">
                {reverseRelevance.length > NOTION_RELEVANCE &&
                  `${NOTION_RELEVANCE} 이내로 입력해주세요`}
              </span>
              <span className="text-gray-600">
                {reverseRelevance.length}/{NOTION_RELEVANCE}
              </span>
            </p>
          </div>
        </>
      )}
      <RoundSquare>
        <button type="submit" className="w-full h-full">
          확 인
        </button>
      </RoundSquare>
    </form>
  );
}
