import { loadProfile } from "@/app/(profile)/_loaders/loadProfile";
import ProfileForm from "./_components/ProfileForm";
import { redirect } from "next/navigation";

export default async function Page() {
    const { user, apiKeys } = await loadProfile()
    if (!user) {
        redirect('/signin')
    }
    return (
        <ProfileForm user={user} apiKeys={apiKeys} />
    );
}

