import { FailedBookmarkImportType } from "@/lib/repositories/failed_bookmark_imports"
import { ImportStatusType } from "@/lib/repositories/import_status"
import { useEffect, useState } from "react"

export const useImportStatus = (initisalStatus: ImportStatusType) => {
    const [pollingInterval, setPollingInterval] = useState(1000)
    const [importStatus, setImportStatus] = useState(initisalStatus)
    const [importErrors, setImportErrors] = useState<FailedBookmarkImportType[]>([])
    const [loadError, setLoadError] = useState<string | null>(null)
    const hasFinished = importStatus.progress === 100
    const importStatusId = importStatus.id

    useEffect(() => {
        let tryCount = 0;
        const id = setInterval(async () => {
            try {
                if (hasFinished) {
                    clearInterval(id)
                    return
                }
                const newStatus = await fetch(`/api/import/${importStatusId}`).then(res => res.json() as Promise<ImportStatusType | { error: string }>)
                if ('error' in newStatus) {
                    clearInterval(id)
                    setLoadError(newStatus.error)
                    return
                }
                setImportStatus(newStatus)
                if (newStatus.progress === 20) {
                    clearInterval(id)
                    if (pollingInterval !== 5000) {
                        setPollingInterval(5000)
                    }
                }
            } catch (e) {
                tryCount++
                if (tryCount > 5) {
                    clearInterval(id)
                }
            }
        }, pollingInterval)
        return () => clearInterval(id)
    }, [pollingInterval, hasFinished, importStatusId])

    useEffect(() => {
        if (hasFinished) {
            fetch(`/api/import/${importStatusId}/errors`).then(res => res.json() as Promise<FailedBookmarkImportType[]>).then(setImportErrors)
        }
    }, [hasFinished, importStatusId])

    return {
        importStatus,
        importErrors,
        loadError
    }
}