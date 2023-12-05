import { ReactNode, useState } from 'react';

import NotionForm from '@components/item/NotionForm';
import BottomSheet from '@components/common/BottomSheet';

type Content = 'notionItemForm' | 'notionItemPlusMenu';

const content: Record<Content, ReactNode> = {
  notionItemForm: <NotionForm />,
  notionItemPlusMenu: <></>,
};

export const useBottomSheetContent = () => {
  const [bottomSheetContent, setBottomSheetContent] = useState<Content | null>(
    null,
  );

  return {
    handlePlusButtonClick: () => setBottomSheetContent('notionItemForm'),
    handleMoreMenuButtonClick: () =>
      setBottomSheetContent('notionItemPlusMenu'),
    bottomSheetComponent: bottomSheetContent ? (
      <BottomSheet closeEvent={() => setBottomSheetContent(null)}>
        {content[bottomSheetContent]}
      </BottomSheet>
    ) : (
      <></>
    ),
  };
};
