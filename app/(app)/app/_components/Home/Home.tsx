import { FC } from "react";

type Props = {
    user: {
        username: string
    }
}

const Home: FC<Props> = ({
    user
}) => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div> Welcome {user.username} !<br /> Lets add first bookmark</div>
            <div className='flex items-center gap-1'>
            </div>
        </div>
    );
}

export default Home