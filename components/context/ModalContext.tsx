import {
  Fragment,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react';

interface ModalContextProps {
  addModal: (id: number, element: ReactNode) => void;
  deleteModal: (id: number) => void;
}

export const modalContext = createContext<ModalContextProps | null>(null);

export default function ModalContext({ children }: { children: ReactNode }) {
  const [modalList, setModalList] = useState<Map<number, ReactNode>>(new Map());

  const addModal = (id: number, element: ReactNode) => {
    setModalList((prev) => {
      const copy = new Map(prev);
      copy.set(id, element);

      return copy;
    });
  };

  const deleteModal = (id: number) => {
    setModalList((prev) => {
      const copy = new Map(prev);
      copy.delete(id);

      return copy;
    });
  };

  return (
    <modalContext.Provider value={{ addModal, deleteModal }}>
      {children}
      {[...modalList.entries()].map(([id, element]) => (
        <Fragment key={id}>{element}</Fragment>
      ))}
    </modalContext.Provider>
  );
}

export const useModalContext = () => useContext(modalContext);
