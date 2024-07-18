import { loadProfile } from "@/app/(profile)/_loaders/loadProfile";
import ProfileForm from "../_components/ProfileForm";

export default async function Page() {
    const { user } = await loadProfile()
    return (
        <ProfileForm user={user} />
    );
}

