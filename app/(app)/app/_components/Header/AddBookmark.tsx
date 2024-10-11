'use client'

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";

const AddBookmark = () => {

    return (
        <Button aria-label="add bookmark" asChild className="ml-auto text-xl" variant='ghost' size='icon'>
            <Link href="/app/new-bookmark" className="flex items-center">
                <PlusCircle className="size-6" />
            </Link>
        </Button>
    );
}

export default AddBookmark;