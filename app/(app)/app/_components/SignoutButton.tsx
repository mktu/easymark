'use client'
import { handleSignout } from '@/app/(auth)/_actions/authHandler';
import React from 'react';

const SignoutButton: React.FC = () => {
    return (
        <button onClick={() => {
            handleSignout()
        }}>Logout</button>
    );
};

export default SignoutButton;