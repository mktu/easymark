import LoadingIcon from "@/components/svg/Loading";
import { ImportStatusType } from "@/lib/repositories/import_status";
import { CheckCircle2Icon } from "lucide-react";
import { FC } from "react";

type Props = {
    importStatus: ImportStatusType,
}

const ImportStatus: FC<Props> = ({ importStatus }) => {
    if (importStatus.progress !== 100) {
        return (
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                <LoadingIcon className='stroke-input' />
                <span>インポート中です...進捗 {importStatus.progress}%</span>
            </div>
        )
    }
    return (
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
            <CheckCircle2Icon className='fill-green-400 stroke-white' />
            <span>インポートが完了しました! インポート中に発生したエラーは以下を確認してください.</span>
        </div>
    )
}

export default ImportStatus