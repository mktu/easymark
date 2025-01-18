import ImportList from "./_components/ImportList";
import { loadImportStatusList } from "@/loader/import/loadImportStatusList";

export default async function Page() {
    return <ImportList importStatusList={await loadImportStatusList()} />
}