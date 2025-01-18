'use client'
import { FC } from "react";
import TableLayout from "./_components/TableLayout";

type Props = {
    error: Error & { digest?: string }
}

const Error: FC<Props> = ({ error }) => {
    return <TableLayout error={error.message} />
}

export default Error