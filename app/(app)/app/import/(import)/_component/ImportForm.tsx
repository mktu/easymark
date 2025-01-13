import { handleImportBookmarks } from "@/actions/bookmarks/handleImportBookmarks"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useImport } from "@/hooks/import/useImport"
import { UploadBookmarkType } from "@/hooks/import/useUpload"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Props = {
    bookmarks: UploadBookmarkType[]
}

const ImportForm: React.FC<Props> = ({ bookmarks: initialBookmarks }) => {
    const { bookmarks, onCheckBookmark } = useImport(initialBookmarks)
    const [importingStatus, setImportingStatus] = useState<number | null>(null)
    const router = useRouter()
    return (
        <form className='flex flex-1 flex-col gap-2 overflow-hidden'
            action={async () => {
                const result = await handleImportBookmarks(bookmarks.filter((b) => b.checked))
                if (typeof result === 'number') {
                    setImportingStatus(result)
                    router.push(`/app/import/${result}`)
                } else {
                    toast.error('Failed to import bookmarks.')
                }
            }}
        >
            {importingStatus !== null && (
                <div className='flex items-center justify-center bg-primary-foreground p-4'>
                    ブックマークをインポート中です<Button asChild variant='link'><Link href={`/app/import/${importingStatus}`}>(詳細)</Link></Button>。
                </div>
            )}
            <ScrollArea className="size-full rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-background">
                            <TableHead className='w-[64px]'>
                                <Checkbox checked={bookmarks.length > 0 && bookmarks.every((b) => b.checked)} onCheckedChange={(checked) => {
                                    bookmarks.forEach((b) => onCheckBookmark(b, checked === true))
                                }} />
                            </TableHead>
                            <TableHead >URL</TableHead>
                            <TableHead >Title</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {bookmarks.map((bookmark) => (
                            <TableRow key={bookmark.url}>
                                <TableCell>
                                    <Checkbox checked={bookmark.checked} onCheckedChange={(checked) => {
                                        onCheckBookmark(bookmark, checked === true)
                                    }} />
                                </TableCell>
                                <TableCell>{bookmark.title}</TableCell>
                                <TableCell>{bookmark.url}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
            <div className='flex items-center justify-end gap-2'>
                <Button disabled={bookmarks.length === 0} type='submit'>Import</Button>
            </div>
        </form>
    )
}

export default ImportForm