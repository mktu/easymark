import SignoutButton from "./_components/SignoutButton";
import { redirectIfNotRegistered } from "../../(profile)/_loaders/assertkRegistration";


const Layout = async ({
    children,
}: {
    children: React.ReactNode
}) => {
    await redirectIfNotRegistered()
    return <main>
        {children}
        <SignoutButton />
    </main>
}

export default Layout;