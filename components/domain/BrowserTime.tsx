'use client'
import { formatTimestamp } from "@/lib/client/dateConverter"
import { FC } from "react"

type Props = {
    timestamp: string
}

const BrowserTime: FC<Props> = ({ timestamp }) => (
    <>{formatTimestamp(timestamp)}</>
)

export default BrowserTime