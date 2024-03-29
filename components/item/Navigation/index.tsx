import { Fragment } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';

import RoundSquare from '@components/common/RoundSquare';

import { useMovePage } from 'hooks/useMovePage';

export default function Navigation() {
  const { nowNotionFolder, recentlyNotionList } = useRecentlyNotionContext();
  const { moveMainPage, moveNotionFolderItemListPage, moveNotionItemPage } =
    useMovePage();

  return (
    <div className="overflow-x-auto overflow-y-hidden snap-x">
      <nav className="h-[60px] sm:h-[80px] flex gap-3 w-max">
        <RoundSquare size="free" color="blue">
          <button
            className="w-max min-w-[80px] h-[30px] pl-2 pr-2 font-bold"
            onClick={() => moveMainPage()}
          >
            홈페이지
          </button>
        </RoundSquare>
        {nowNotionFolder && (
          <RoundSquare size="free" color="lightBlue">
            <button
              className="w-max min-w-[80px] h-[30px] pl-2 pr-2 font-bold"
              onClick={() => moveNotionFolderItemListPage(nowNotionFolder.id)}
            >
              {nowNotionFolder.name} 폴더
            </button>
          </RoundSquare>
        )}
        {recentlyNotionList.map(({ id, name, color }) => {
          return (
            <Fragment key={id}>
              <RoundSquare size="free" color={color}>
                <button
                  className="w-max min-w-[80px] h-[30px] pl-2 pr-2"
                  onClick={() => moveNotionItemPage(id)}
                >
                  {name}
                </button>
              </RoundSquare>
            </Fragment>
          );
        })}
      </nav>
    </div>
  );
}
