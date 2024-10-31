import React from "react";
import { redirectIfNotRegistered } from "../../(profile)/_loaders/assertkRegistration";
import Header from "./_components/Header/Header";
import Provider from "./_components/Provider";
import { Sidebar } from "./_components/Sidebar";
import { SidebarLayout } from "./_components/Layout";
import { SearchDialog } from "./bookmarks/_exports";


const Layout = async ({
    children,
    modal,
}: {
    children: React.ReactNode,
    modal: React.ReactNode,
}) => {
    await redirectIfNotRegistered()
    return (
        <Provider>
            <SidebarLayout
                sidebar={<Sidebar />}
                header={<Header />}
                content={
                    <>
                        <main className="size-full flex-1 overflow-auto">
                            {children}

                        </main>
                    </>
                }
            />
            <SearchDialog />
            {modal}
        </Provider>
    )
}

export default Layout;