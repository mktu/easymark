import { FC, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckIcon, ClipboardIcon } from "lucide-react";

type Props = {
    content: string,
    id: string
}

const CopyableItem: FC<Props> = ({ id, content }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    };

    return (
        <div className="flex items-center">
            <div className="w-full">
                <Input id={id} className='rounded-none rounded-s-md border-e-0 focus:outline-none
                 focus-visible:outline-none' disabled defaultValue={content} />
            </div>
            <Button type='button' variant='outline' onClick={handleCopy} className='flex w-[150px] items-center gap-1 rounded-none rounded-e-md'>
                {isCopied ?
                    <>
                        <CheckIcon className='ml-2 size-5' />
                        Copied
                    </>
                    :
                    <>
                        <ClipboardIcon className='ml-2 size-5' />
                        Copy
                    </>
                }
            </Button>
        </div>
    );
}

export default CopyableItem;