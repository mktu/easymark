'use client'
import { handleSignout } from '@/app/(auth)/_actions/authHandler';
import { Button } from '@/components/ui/button';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOutIcon } from 'lucide-react';
import React from 'react';

const SignoutButton: React.FC = () => {
    return (
        <SidebarMenuButton asChild>
            <Button variant={'ghost'} className='w-full justify-start' onClick={() => {
                handleSignout()
            }}>
                <LogOutIcon className='size-6' />
                <span>Logout</span>
            </Button>
        </SidebarMenuButton>

    );
};

export default SignoutButton;