'use client'
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";

const OpenLinkButton = ({ url, onClick }: { url: string, onClick: () => void }) => {
    return (
        <Button className='flex items-center justify-center' variant={'ghost'} size='icon' onClick={(e) => {
            window.open(url, '_blank', 'noopener,noreferrer');
            onClick();
            e.preventDefault()
            e.stopPropagation()
        }}>
            <ExternalLinkIcon className="size-6" />
        </Button>
    )
}

export default OpenLinkButton