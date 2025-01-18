import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type Props = {
    children?: React.ReactNode,
    error?: string
}

const TableLayout: React.FC<Props> = ({
    children,
    error
}) => {
    return (
        <div className="flex flex-col overflow-hidden md:size-full">
            <div className='p-2'>
                {error && <p className='text-destructive'>{error}</p>}
            </div>
            <ScrollArea className="size-full rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-background">
                            <TableHead >ID</TableHead>
                            <TableHead >日時</TableHead>
                            <TableHead >対象のブックマーク数</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default TableLayout