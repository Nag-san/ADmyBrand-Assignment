import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("bg-gray-300 animate-pulse rounded-md", className)} // <-- test with gray
      {...props}
    />
  );
}

export { Skeleton };
