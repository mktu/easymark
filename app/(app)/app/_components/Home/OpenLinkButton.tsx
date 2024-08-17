'use client'
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

const OpenLinkButton = ({ url }: { url: string }) => {
    'use client'
    return (
        <Button className='ml-auto flex items-center justify-center' variant={'ghost'} size='icon' onClick={(e) => {
            window.open(url, '_blank', 'noopener,noreferrer');
            e.preventDefault()
            e.stopPropagation()
        }}>
            <ExternalLinkIcon className="size-6" />
        </Button>
    )
}

export default OpenLinkButton