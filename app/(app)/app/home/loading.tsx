import LoadingIcon from "@/components/svg/Loading";
import { FC } from "react";

const Loading: FC = () => {
    return (
        <div className="flex size-full items-center justify-center">
            <div className="flex items-center gap-2">
                <LoadingIcon className='stroke-input' />
                <span className='text-muted-foreground'>Waiting for your launching ...</span>
            </div>
        </div>
    )
}

export default Loading