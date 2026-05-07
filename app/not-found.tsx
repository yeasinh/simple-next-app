import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Page Not Found</h1>
      <p className="mt-2 text-sm text-slate-600">The resource you are looking for does not exist or was removed.</p>
      <Link href="/" className="mt-4 inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
        Go Home
      </Link>
    </div>
  );
}
