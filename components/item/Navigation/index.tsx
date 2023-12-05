import { Fragment } from 'react';

import { useRecentlyNotionContext } from '@components/context/RecentlyNotionContext';

import RoundSquare from '@components/common/RoundSquare';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();
  const { recentlyNotionList } = useRecentlyNotionContext();

  const moveNotionItemPage = (id: number) => {
    router.push(`/notion/${id}`, { scroll: true });
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden snap-x">
      <nav className="h-[60px] sm:h-[80px] flex gap-3 w-max">
        {recentlyNotionList.map(({ id, name }) => {
          return (
            <Fragment key={id}>
              <RoundSquare size="free">
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
