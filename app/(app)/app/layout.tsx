import { redirectIfNotRegistered } from "../../(profile)/_loaders/assertkRegistration";
import Header from "./_components/Header/Header";
import { Sidebar } from "./_components/Sidebar";


const Layout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    await redirectIfNotRegistered()
    return (
        <main className="h-screen w-screen">
            <div className="flex w-full">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    {children}
                </div>
            </div>
        </main>
    )
}

export default Layout;