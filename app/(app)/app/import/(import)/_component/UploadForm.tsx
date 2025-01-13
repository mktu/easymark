import { Input } from "@/components/ui/input";
import { FC } from "react";
import ErrorIndicator from "../../../_components/ErrorIndicator/ErrorIndicator";
import Procedure from "./Procedure";

type Props = {
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string | null
}

const UploadForm: FC<Props> = ({
    onChangeFile,
    error
}) => {
    return (
        <form className="flex flex-col gap-2 p-2">
            <Input onChange={onChangeFile} className='mx-4 my-5 w-fit cursor-pointer' type='file' accept='.html' />
            <ErrorIndicator error={error || ''} />
        </form>
    )
}

export default UploadForm;