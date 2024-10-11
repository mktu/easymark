import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Search: FC = () => {
    return (
        <Button asChild className="" variant='ghost' size='icon'>
            <Link href="/app/search" className="flex items-center gap-2">
                <SearchIcon className="size-6" />
            </Link>
        </Button>
    );
}

export default Search