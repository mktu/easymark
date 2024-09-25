import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { FC } from "react";

interface Props {
    color?: string | null;
    className?: string
}

const categoryBoxVariants = cva(
    "rounded border border-input",
    {
        variants: {
            size: {
                default: "size-6",
                sm: "size-5",
                lg: "size-12",
            },
        },
        defaultVariants: {
            size: "default",
        },
    }
)

const CategoryBox: FC<Props & VariantProps<typeof categoryBoxVariants>> = ({
    color,
    className,
    size
}) => {
    return (
        <div className={cn(className, 'border rounded border-input', categoryBoxVariants({ size }))} style={{ backgroundColor: color || 'white' }}>
            {!color && <svg className='size-full stroke-input'>
                <line stroke="5, 5" x1="0" y1="100%" x2="100%" y2="0" strokeWidth={1} />
            </svg>}
        </div>
    );
}

export default CategoryBox;