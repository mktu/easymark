import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HelpCircleIcon } from "lucide-react";
import { FC } from "react";

const Procedure: FC = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size='icon' variant='ghost'>
                    <HelpCircleIcon size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div>
                    ブラウザに従ってブックマークをエクスポートしてください。
                    <ul className='ml-2 list-inside list-disc p-2 ps-2 text-sm'>
                        <li>Google Chromeの場合: <a className='underline' href="https://support.google.com/chrome/answer/96816?co=GENIE.Platform%3DDesktop&hl=ja">Google Chrome のブックマークをエクスポートする</a></li>
                        <li>Firefoxの場合: <a className='underline' href="https://support.mozilla.org/ja/kb/export-firefox-bookmarks-to-backup-or-transfer">Firefox のブックマークをエクスポートする</a></li>
                        <li>Microsoft Edgeの場合: <a className='underline' href="https://support.microsoft.com/ja-jp/windows/internet-explorer-%E3%81%AE%E3%81%8A%E6%B0%97%E3%81%AB%E5%85%A5%E3%82%8A%E3%82%92%E6%96%B0%E3%81%97%E3%81%84-pc-%E3%81%AB%E7%A7%BB%E5%8B%95%E3%81%99%E3%82%8B-a03f02c7-e0b9-5d8b-1857-51dd70954e47">Microsoft Edge のブックマークをエクスポートする</a></li>
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default Procedure