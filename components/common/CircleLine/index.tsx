interface CircleLineProps {
  direction?: 'row' | 'column';
  amount?: number;
}

export default function CircleLine({
  direction = 'row',
  amount = 5,
}: CircleLineProps) {
  return (
    <button
      className={`w-fit h-fit flex justify-center items-center ${
        direction === 'row' ? 'flex-row' : 'flex-col'
      } gap-1`}
    >
      {new Array(amount).fill(0).map((_, index) => (
        <div key={index} className="w-2 h-2 bg-slate-400 rounded-full" />
      ))}
    </button>
  );
}
