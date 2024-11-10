'use client'
import { Button } from "@/components/ui/button";
import { useBookmarkSearchDialogContext } from "@/contexts/bookmark-search-dialog";
import { SearchIcon } from "lucide-react";
import { FC } from "react";

const Search: FC = () => {
    const { openDialog } = useBookmarkSearchDialogContext()
    return (
        <Button className="flex items-center gap-2" variant='ghost' size='icon' onClick={openDialog}>
            <SearchIcon className="size-6" />
        </Button>
    );
}

export default Search