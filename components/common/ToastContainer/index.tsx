import { ToastInfo } from '@components/context/toast';
import * as S from './style';
import Toast from '../Toast';
interface ToastContainerProps {
  toastList: ToastInfo[];
}

export default function ToastContainer({ toastList }: ToastContainerProps) {
  return (
    <S.Container>
      {toastList.map((toast) => (
        <Toast key={toast.id} size="free">
          {toast.text}
        </Toast>
      ))}
    </S.Container>
  );
}
