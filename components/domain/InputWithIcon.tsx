import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className={cn(
                'flex items-center h-10 w-full rounded-md border border-input bg-background py-2 ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',
                className
            )}>
                {leftIcon}
                <input
                    type={type}
                    className={cn(
                        "flex w-full bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                        leftIcon ? 'pl-3' : 'pr-3',
                    )}
                    ref={ref}
                    {...props}
                />
                {rightIcon}
            </div>
        )
    }
)
InputWithIcon.displayName = "InputWithIcon"

export { InputWithIcon }