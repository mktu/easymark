'use client'
import { FC } from "react";
import UploadForm from "./UploadForm";
import { useUpload } from "@/hooks/import/useUpload";
import ImportForm from "./ImportForm";

const Import: FC = () => {
    const { onChangeFile, bookmarks, error } = useUpload()
    return (
        <div className="flex w-full flex-col gap-2 overflow-hidden md:h-full">
            <UploadForm onChangeFile={onChangeFile} error={error} />
            <ImportForm bookmarks={bookmarks} />
        </div>
    );
}

export default Import;