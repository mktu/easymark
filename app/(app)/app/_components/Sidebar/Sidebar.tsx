// sidebar component

import { FC } from "react";
import SignoutButton from "../SignoutButton";


const Sidebar: FC = () => {
    return (
        <div className="flex flex-col">
            <div>Home</div>
            <div>Categories</div>
            <div>Tags</div>
            <div>Recent Bookmarks</div>
            <SignoutButton />
        </div>
    )
}

export default Sidebar;