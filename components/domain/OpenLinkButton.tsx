'use client'
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

const OpenLinkButton = ({ url, onClick }: { url: string, onClick: () => void }) => {
    return (
        <Button className='flex items-center justify-center size-8' variant={'ghost'} size='fit' onClick={(e) => {
            window.open(url, '_blank', 'noopener,noreferrer');
            onClick();
            e.preventDefault()
            e.stopPropagation()
        }}>
            <ExternalLinkIcon className="size-5" />
        </Button>
    )
}

export default OpenLinkButton