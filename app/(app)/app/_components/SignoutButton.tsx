'use client'
import { handleSignout } from '@/app/(auth)/_actions/authHandler';
import { Button } from '@/components/ui/button';
import React from 'react';

const SignoutButton: React.FC = () => {
    return (
        <Button className='w-fit' onClick={() => {
            handleSignout()
        }}>Logout</Button>
    );
};

export default SignoutButton;