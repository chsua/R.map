import { ToastInfo } from '@components/context/toast';
import Toast from '../Toast';
interface ToastContainerProps {
  toastList: ToastInfo[];
}

export default function ToastContainer({ toastList }: ToastContainerProps) {
  return (
    <div className="w-4/5 fixed bottom-[20vh] left-[10%] flex flex-col gap-1 z-50">
      {toastList.map((toast) => (
        <Toast key={toast.id} size="free">
          {toast.text}
        </Toast>
      ))}
    </div>
  );
}
