import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ApiKeyType } from "@/lib/repositories/api_key"
import { FC } from "react"
import ApiKeyTableItem from "./ApikeyTableItem"

type Props = {
    apiKeys: ApiKeyType[]
}

const ApiKeyTable: FC<Props> = ({
    apiKeys
}) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="md:w-[100px]">Label</TableHead>
                    <TableHead className="md:w-[350px]">ApiKey</TableHead>
                    <TableHead className="whitespace-nowrap">Expired At</TableHead>
                    <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {apiKeys.map((apiKey) => (
                    <ApiKeyTableItem key={apiKey.apiKey} apiKey={apiKey} />
                ))}
            </TableBody>
        </Table>
    )
}

export default ApiKeyTable;