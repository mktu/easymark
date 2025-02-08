import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FailedBookmarkImportType } from "@/lib/repositories/failed_bookmark_imports"
import { FC } from "react"

type Props = {
    importErrors: FailedBookmarkImportType[]
}

const getErrorMessage = (errorType: string) => {
    switch (errorType) {
        case 'get-ogp':
            return 'OGPの取得に失敗'
        case 'save-bookmark':
            return 'ブックマークの保存に失敗'
        case 'save-bookmark-dupplicate':
            return 'ブックマークの保存に失敗(重複)'
        case 'save-ogp':
            return 'OGPの保存に失敗'
        default:
            return '不明なエラー'
    }
}

const ImportErrors: FC<Props> = ({ importErrors }) => {
    const urls = Array.from(new Set(importErrors.map(importError => importError.url)))

    const checkAndGetErrors = (url: string, fbis: FailedBookmarkImportType[]) => {
        return fbis.filter(v => v.url === url).map(v => getErrorMessage(v.errorMessage || '')).join(', ')
    }
    return (
        <ScrollArea className="size-full rounded-md border">
            <Table>
                <TableHeader className="bg-background">
                    <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {urls.map(url => (
                        <TableRow key={url}>
                            <TableCell>{url}</TableCell>
                            <TableCell>{checkAndGetErrors(url, importErrors)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ScrollArea>
    )
}

export default ImportErrors