import SettingForm from "./_components/SettingForm";
import { loadSettings } from "@/loader/settings/loadSettings";

export default async function Page() {
    const { apiKeys } = await loadSettings()
    return (
        <SettingForm apiKeys={apiKeys} />
    );
}

