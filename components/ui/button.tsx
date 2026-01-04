import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1560bd] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-95",
    {
        variants: {
            variant: {
                default: "bg-[#1560bd] text-white shadow-lg shadow-[#1560bd]/20 hover:bg-[#1560bd]/90",
                destructive:
                    "bg-red-500 text-white shadow-sm hover:bg-red-500/90 shadow-red-500/10",
                outline:
                    "border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900",
                secondary:
                    "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200",
                ghost: "hover:bg-gray-100 hover:text-gray-900",
                link: "text-[#1560bd] underline-offset-4 hover:underline",
                premium: "bg-gradient-to-r from-[#1560bd] to-blue-500 text-white shadow-xl shadow-blue-500/20 hover:opacity-90",
            },
            size: {
                default: "h-11 px-6 py-2",
                sm: "h-9 rounded-lg px-3 text-xs",
                lg: "h-12 rounded-2xl px-8 text-base",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
