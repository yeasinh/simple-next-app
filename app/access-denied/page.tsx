import Link from "next/link";

export default function AccessDeniedPage() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 text-amber-900 shadow-sm">
      <h1 className="text-2xl font-semibold">Access Denied</h1>
      <p className="mt-2 text-sm">
        Middleware blocked access to this route because the `can_write_tasks=true` cookie is not set.
      </p>
      <p className="mt-2 text-sm">
        To test create/edit flow, open browser devtools and set the cookie manually, then refresh.
      </p>
      <Link href="/tasks" className="mt-4 inline-block rounded-lg bg-amber-900 px-4 py-2 text-sm text-white">
        Back to Tasks
      </Link>
    </div>
  );
}
