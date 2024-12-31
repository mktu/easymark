import { handleSignout } from "@/actions/auth/handleSignOut";
import { Button } from "@/components/ui/button";
import { SheetFooter } from "@/components/ui/sheet";
import { LogOutIcon } from "lucide-react";
import { FC } from "react";

const Footer: FC = () => {
    return (
        <SheetFooter>
            <Button variant={'ghost'} className='w-full justify-start' onClick={() => {
                handleSignout()
            }}>
                <LogOutIcon className='size-6' />
                <span>Logout</span>
            </Button>
        </SheetFooter>
    )
}

export default Footer;