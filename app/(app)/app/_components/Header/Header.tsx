import React from 'react';
import AddBookmark from './AddBookmark';
import Search from './Search';
import Profile from './Profile';
import { MenuDrawer } from '../MenuDrawer';
import Logo from './Logo';

const Header: React.FC = () => {
    return (
        <header className='flex w-full gap-1 bg-white py-2 shadow'>
            <div className="hidden px-4 md:block">
                <Logo />
            </div>
            <MenuDrawer />
            <div className='ml-auto' />
            <AddBookmark />
            <Search />
            <Profile />
        </header>
    );
};

export default Header;