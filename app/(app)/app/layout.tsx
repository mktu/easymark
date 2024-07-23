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
        <main>
            <div className="flex">
                <Sidebar />
                <div>
                    <Header />
                    {children}
                </div>
            </div>
        </main>
    )
}

export default Layout;