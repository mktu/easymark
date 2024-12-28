import { FC } from "react";
import TopMessage from "./TopMessage";
import AboutThisApp from "./AboutThisApp";

const Landing: FC = () => {
    return (
        <main className="flex min-h-screen flex-col items-center gap-4 p-8 md:p-24">
            <TopMessage />
            <AboutThisApp />
        </main>
    )
}

export default Landing