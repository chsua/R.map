import { ReactNode, useState } from 'react';

import NotionForm from '@components/item/NotionForm';
import BottomSheet from '@components/common/BottomSheet';
import { Notion } from 'types/notion';

type Content = 'notionItemForm' | 'notionItemPlusMenu';

export const useNotionItemBottomSheet = (
  type: 'make' | 'edit',
  notion?: Notion,
) => {
  const [bottomSheetContent, setBottomSheetContent] = useState<Content | null>(
    null,
  );

  const resetBottomSheetContent = () => {
    setBottomSheetContent(null);
  };

  const content: Record<Content, ReactNode> = {
    notionItemForm: (
      <NotionForm
        type={type}
        data={notion}
        submitEvent={resetBottomSheetContent}
      />
    ),
    notionItemPlusMenu: <></>,
  };

  return {
    handlePlusButtonClick: () => setBottomSheetContent('notionItemForm'),
    handleMoreMenuButtonClick: () =>
      setBottomSheetContent('notionItemPlusMenu'),
    bottomSheetComponent: bottomSheetContent ? (
      <BottomSheet closeEvent={resetBottomSheetContent}>
        {content[bottomSheetContent]}
      </BottomSheet>
    ) : (
      <></>
    ),
  };
};
