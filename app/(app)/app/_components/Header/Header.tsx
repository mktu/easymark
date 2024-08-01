import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className='flex w-full gap-2'>
            <div className="">
                logo
            </div>
            <div className="ml-auto">
                search
            </div>
            <Link href="/app/profile">Profile</Link>
        </header>
    );
};

export default Header;