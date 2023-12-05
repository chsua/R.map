import RoundSquare from '@components/common/RoundSquare';
import React from 'react';

export default function NotionForm() {
  return (
    <form className="w-[90%] h-[90%] flex gap-5 flex-col ">
      <RoundSquare size="sm">
        <input
          placeholder="개념을 입력해주세요"
          className="bg-transparent w-full p-3 focus:outline-none"
        />
      </RoundSquare>
      <RoundSquare size="free">
        <textarea
          placeholder="개념 설명을 입력해주세요"
          className="bg-transparent w-full resize-none h-[220px] p-3  focus:outline-none"
        />
      </RoundSquare>
      <RoundSquare>
        <button type="submit">확 인</button>
      </RoundSquare>
    </form>
  );
}
