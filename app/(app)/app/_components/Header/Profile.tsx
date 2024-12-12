'use client'
import { handleSignout } from "@/app/(auth)/_actions/authHandler";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

const Profile: FC = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button className="" variant='ghost' size='icon'>
                    <UserCircle2Icon className="size-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem asChild>
                    <Link href="/app/profile">Edit Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => {
                    handleSignout()
                }}>
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default Profile