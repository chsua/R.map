import CenterCenter from '@components/common/CenterCenter';
import LoadingSpinner from '@components/common/LoadingSpinner';

export default function loading() {
  return (
    <CenterCenter style="w-full h-[50vh]">
      <LoadingSpinner />
    </CenterCenter>
  );
}
