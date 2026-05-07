"use client";

type RootErrorProps = {
  error: Error;
  reset: () => void;
};

export default function RootError({ error, reset }: RootErrorProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-red-900">
      <h2 className="text-2xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm text-white">
        Try again
      </button>
    </div>
  );
}
