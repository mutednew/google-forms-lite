import { cn } from "../../lib/cn"
import { HTMLAttributes } from "react"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
    return (
        <div
            className={cn(
                "animate-pulse rounded-md transition-colors",
                "bg-slate-200 dark:bg-slate-800",
                className,
            )}
            {...props}
        />
    )
}

export default Skeleton
