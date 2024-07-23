import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='flex gap-2'>
            <div className="">
                logo
            </div>
            <div className="">
                search
            </div>
            <Link href="/app/profile">Profile</Link>
        </header>
    );
};

export default Header;