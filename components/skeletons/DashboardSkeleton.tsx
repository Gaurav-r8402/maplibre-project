
export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 pt-16 animate-pulse">

      <div className="col-span-12 lg:col-span-8 h-[600px] rounded-xl bg-gray-200 dark:bg-zinc-700" />

      <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">

        <div className="dark:bg-zinc-800 p-4 h-48 rounded-xl border shadow-md">
          <div className="h-5 w-full p-2 bg-gray-300 dark:bg-zinc-700 rounded mb-3"></div>
          <div className="h-12 w-full p-2 bg-gray-300 dark:bg-zinc-700 rounded"></div>
        </div>

        <div className="dark:bg-zinc-800 h-full rounded-xl border shadow-md">
          <div className="p-4 border-b border-gray-200 dark:border-zinc-500">
            <div className="h-6 w-32 bg-gray-300 dark:bg-zinc-700 rounded"></div>
          </div>

          <div className="flex items-center justify-center py-10">
            <div className="h-40 w-40 bg-gray-300 dark:bg-zinc-700 rounded-full"></div>
          </div>
        </div>

      </div>
      <div className="col-span-12 dark:bg-zinc-800 rounded-xl border shadow-md p-4">
        <div className="h-6 w-1/4 bg-gray-300 dark:bg-zinc-700 rounded mb-4"></div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-zinc-700 rounded"></div>
        </div>
      </div>

    </div>
  );
}
