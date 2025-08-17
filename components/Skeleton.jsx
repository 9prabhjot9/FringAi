import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 mt-6">
      <Skeleton className="h-[125px] w-[800px] rounded-xl" />
     
      <div className="space-y-2">
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
         <Skeleton className="h-[125px] w-[800px] rounded-xl mt-12" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
        <Skeleton className="h-4 w-[800px]" />
      </div>
    </div>
  )
}
