import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm space-y-2">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="h-72 rounded-xl border bg-card p-4 shadow-sm space-y-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-full w-full rounded" />
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm space-y-3">
      <Skeleton className="h-4 w-1/4" />
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  )
}
