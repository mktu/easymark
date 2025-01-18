'use client'
import BrowserTime from "@/components/domain/BrowserTime"
import { TableHead, TableRow } from "@/components/ui/table"
import { ImportStatusType } from "@/lib/repositories/import_status"
import TableLayout from "./TableLayout"
import { useRouter } from "next/navigation"

type Props = {
    importStatusList: ImportStatusType[]
}

const ImportList: React.FC<Props> = ({ importStatusList }) => {
    const router = useRouter()
    return (
        <TableLayout>
            {importStatusList.map((importStatus) => (
                <TableRow className='cursor-pointer' onClick={() => {
                    router.push(`/app/import/status/${importStatus.id}`)
                }} key={importStatus.id}>
                    <TableHead>{importStatus.id}</TableHead>
                    <TableHead>{importStatus.createdAt ? (
                        <BrowserTime timestamp={importStatus.createdAt} />
                    ) : '-'}</TableHead>
                    <TableHead>
                        {importStatus.totalItems}
                    </TableHead>
                </TableRow>
            ))}
        </TableLayout>
    )
}

export default ImportList