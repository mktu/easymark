'use client'
import { useImportStatus } from "@/hooks/import/useImportStatus"
import { ImportStatusType } from "@/lib/repositories/import_status"
import ImportStatus from "./ImportStatus"
import ImportErrors from "./ImportErrors"
import { FC } from "react"

type Props = {
    importStatus: ImportStatusType,
}

const ImportStatusView: FC<Props> = ({ importStatus: initialImportStatus }) => {
    const { importStatus, importErrors } = useImportStatus(initialImportStatus)
    return (
        <div className='flex flex-col gap-4 overflow-hidden md:size-full'>
            <div>
                <ImportStatus importStatus={importStatus} />
            </div>
            <div className='flex-1 overflow-hidden'>
                <ImportErrors importErrors={importErrors} />
            </div>
        </div>
    )
}

export default ImportStatusView