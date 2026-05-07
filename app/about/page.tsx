export const dynamic = "force-static";

export default function AboutPage() {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-semibold">About This Practice Project (SSG)</h1>
      <p className="text-slate-700">
        This page is statically generated and demonstrates the SSG behavior in Next.js App Router.
      </p>
      <p className="text-slate-700">
        Core features included: CRUD tasks, search, sort, filter, pagination, route handlers, middleware, reusable
        layouts, loading states, error boundaries, and JSON Server-backed local API.
      </p>
    </div>
  );
}
