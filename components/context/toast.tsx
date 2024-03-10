import ToastContainer from '@components/common/ToastContainer';
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export interface ToastInfo {
  id: number;
  text: string;
}

interface ToastContextProps {
  addMessage: (message: string) => void;
}

export const toastContext = createContext<ToastContextProps>({
  addMessage: (message: string) => {},
});

/**
 * 토스트가 사용자에게 보여지는 시간(ms단위)을 뜻합니다.
 */
export const TOAST_TIME = 3000;

export default function ToastContext({ children }: PropsWithChildren) {
  const [toastList, setToastList] = useState<ToastInfo[]>([]);

  const timeId = useRef<number | null>(null);

  useEffect(() => {
    if (timeId.current) window.clearTimeout(timeId.current);

    if (toastList.length !== 0) {
      timeId.current = window.setTimeout(() => {
        setToastList([]);

        if (timeId.current) window.clearTimeout(timeId.current);
      }, TOAST_TIME);
    }
  }, [toastList]);

  const addMessage = (message: string) => {
    if (toastList.find((toast) => toast.text === message)) return;

    const id = Date.now();
    setToastList((toastList) => [...toastList, { id, text: message }]);
  };

  return (
    <toastContext.Provider value={{ addMessage }}>
      <ToastContainer toastList={toastList} />
      {children}
    </toastContext.Provider>
  );
}

export const useToastContext = () => useContext(toastContext);
