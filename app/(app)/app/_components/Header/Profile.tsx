import { Button } from "@/components/ui/button";
import { User2Icon, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Profile: FC = () => {
    return (
        <Button asChild className="" variant='ghost' size='icon'>
            <Link href="/app/profile" className="flex items-center">
                <UserCircle2Icon className="size-6" />
            </Link>
        </Button>
    );
}

export default Profile