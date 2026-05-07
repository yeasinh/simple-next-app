"use client";

type TasksErrorProps = {
  error: Error;
  reset: () => void;
};

export default function TasksError({ error, reset }: TasksErrorProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-900">
      <h2 className="text-xl font-semibold">Task page failed</h2>
      <p className="mt-2 text-sm">{error.message}</p>
      <button onClick={reset} className="mt-4 rounded-lg bg-red-700 px-4 py-2 text-sm text-white">
        Retry
      </button>
    </div>
  );
}
