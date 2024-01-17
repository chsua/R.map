'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      {error.message}
      <br />
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
