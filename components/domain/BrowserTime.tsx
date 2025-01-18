'use client'
import { formatTimestamp } from "@/logics/dateConverter"
import { FC } from "react"

type Props = {
    timestamp: string,
    dateOnly?: boolean
}

const BrowserTime: FC<Props> = ({ timestamp, dateOnly }) => (
    <>{formatTimestamp(timestamp, dateOnly)}</>
)

export default BrowserTime