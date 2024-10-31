import React from 'react';
import AddBookmark from './AddBookmark';
import Search from './Search';
import Profile from './Profile';

const Header: React.FC = () => {
    return (
        <header className='flex w-full gap-1 bg-white py-1 shadow'>
            <div className="">
                logo
            </div>
            <div className='ml-auto' />
            <AddBookmark />
            <Search />
            <Profile />
        </header>
    );
};

export default Header;