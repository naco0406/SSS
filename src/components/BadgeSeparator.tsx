"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BadgeSeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
    limit: number;
}

const BadgeSeparator = React.forwardRef<
    React.ElementRef<typeof SeparatorPrimitive.Root>,
    BadgeSeparatorProps
>(
    (
        { className, orientation = "horizontal", decorative = true, limit, ...props },
        ref
    ) => (
        <div className="relative flex items-center w-full">
            <SeparatorPrimitive.Root
                ref={ref}
                decorative={decorative}
                orientation={orientation}
                className={cn(
                    "shrink-0 bg-border",
                    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
                    className
                )}
                {...props}
            />
            <Badge
                variant="secondary"
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
                정원 {limit}명
            </Badge>
        </div>
    )
)
BadgeSeparator.displayName = "BadgeSeparator"

export { BadgeSeparator }