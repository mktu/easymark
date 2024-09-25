import React from "react";
import { redirectIfNotRegistered } from "../../(profile)/_loaders/assertkRegistration";
import Header from "./_components/Header/Header";
import Provider from "./_components/Provider";
import { Sidebar } from "./_components/Sidebar";


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
            <div className="relative flex h-screen w-screen">
                <Sidebar />
                <div className="flex size-full flex-col overflow-hidden">
                    <Header />
                    <main className="size-full flex-1 overflow-auto">
                        {children}
                        {modal}
                    </main>
                </div>
            </div>
        </Provider>
    )
}

export default Layout;