import Checkbox from '@components/common/Checkbox';
import RoundSquare from '@components/common/RoundSquare';
import { NOTION_TITLE_AMOUNT } from 'constants/amountLimit';
import { useMergeNotionFolder } from 'hooks/query/useMergeNotionFolder';
import { ChangeEvent, useState } from 'react';
import { EssentialNotion } from 'types/notion';

interface MergeNotionFolderProps {
  notionFolderList: EssentialNotion[];
  targetFolderId: number;
  subEvent?: () => void;
}
export default function MergeNotionFolder({
  notionFolderList,
  targetFolderId,
  subEvent,
}: MergeNotionFolderProps) {
  const [selectedFolderList, setSelectFolderList] = useState<number[]>([]);
  const [newFolderName, setNewFolderName] = useState<string>('');
  const { mutate: mergeFolder } = useMergeNotionFolder(subEvent);

  return (
    <div className="py-7 w-[90%] ">
      <div>
        <RoundSquare size="sm">
          <input
            value={newFolderName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              console.log(newFolderName);
              setNewFolderName(e.target.value);
            }}
            placeholder="새로운 폴더의 이름을 입력해주세요"
            className="bg-transparent w-full p-3 "
          />
        </RoundSquare>
        <p className="w-[98%] m-auto flex justify-between">
          <span className="text-red-700">
            {newFolderName.length > NOTION_TITLE_AMOUNT &&
              `${NOTION_TITLE_AMOUNT} 이내로 입력해주세요`}
          </span>
          <span className="text-gray-600">
            {newFolderName.length}/{NOTION_TITLE_AMOUNT}
          </span>
        </p>
      </div>
      <div className="m-3 flex flex-col gap-2">
        {notionFolderList.map((folder) => {
          if (folder.id === targetFolderId) return;
          return (
            <div key={folder.id} className="flex gap-3">
              <Checkbox
                isChecked={selectedFolderList.includes(folder.id)}
                onChange={() => {
                  console.log(folder);
                  setSelectFolderList((prev) => {
                    if (prev.includes(folder.id))
                      return prev.filter((id) => id !== folder.id);

                    return [folder.id, ...prev];
                  });
                }}
              />
              <div>{folder.name}</div>
            </div>
          );
        })}
      </div>
      <RoundSquare>
        <button
          className="w-full h-full"
          type="submit"
          onClick={() => {
            mergeFolder({
              name: newFolderName,
              notionFolderIds: [targetFolderId, ...selectedFolderList],
            });
          }}
        >
          새로운 폴더로 생성하기
        </button>
      </RoundSquare>
    </div>
  );
}
