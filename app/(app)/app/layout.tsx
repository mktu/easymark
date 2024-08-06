import { redirectIfNotRegistered } from "../../(profile)/_loaders/assertkRegistration";
import BookmarkDialog from "./_components/BookmarkDialog/BookmarkDialog";
import Header from "./_components/Header/Header";
import Provider from "./_components/Provider";
import { Sidebar } from "./_components/Sidebar";


const Layout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    await redirectIfNotRegistered()
    return (
        <Provider>
            <div className="flex h-screen w-screen">
                <Sidebar />
                <div className="size-full">
                    <Header />
                    <main>
                        <BookmarkDialog />
                        {children}
                    </main>
                </div>
            </div>
        </Provider>
    )
}

export default Layout;