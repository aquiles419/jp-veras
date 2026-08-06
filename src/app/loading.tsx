export default function Loading() {
  return (
    <div className="min-h-screen bg-bg text-text">
      <div className="sticky top-0 z-20 border-b border-border bg-surface">
        <div className="mx-auto flex max-w-[1280px] items-center gap-5 px-4 py-3.5 md:px-8">
          <div className="h-9 w-9 shrink-0 animate-pulse rounded-full bg-surface-alt" />
          <div className="h-4 w-28 shrink-0 animate-pulse rounded bg-surface-alt" />
          <div className="h-[42px] max-w-[480px] flex-1 animate-pulse rounded-xl bg-surface-alt" />
          <div className="flex-1" />
          <div className="h-[34px] w-[34px] shrink-0 animate-pulse rounded-[10px] bg-surface-alt" />
        </div>
      </div>

      <main className="mx-auto max-w-[1280px] px-4 pb-16 md:px-8">
        <div className="mt-6 h-[290px] animate-pulse rounded-[22px] border border-border bg-surface-alt" />

        <div className="mt-[22px] flex gap-2.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 shrink-0 animate-pulse rounded-full bg-surface-alt"
            />
          ))}
        </div>

        <div className="mt-1.5 h-11 animate-pulse rounded-xl bg-surface-alt" />

        <div className="mt-[22px] grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(250px,1fr))]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
            >
              <div className="h-40 animate-pulse bg-surface-alt" />
              <div className="flex flex-col gap-2.5 p-3.5">
                <div className="h-3 w-16 animate-pulse rounded bg-surface-alt" />
                <div className="h-4 w-full animate-pulse rounded bg-surface-alt" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-surface-alt" />
                <div className="mt-1 h-5 w-20 animate-pulse rounded bg-surface-alt" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
