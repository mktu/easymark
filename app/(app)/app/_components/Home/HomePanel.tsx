import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FC, ReactNode } from "react"

type Props = {
    title: ReactNode,
    children: ReactNode
}

const HomePanel: FC<Props> = ({
    title,
    children
}) => {
    return (
        <section className='flex flex-col gap-2'>
            <Accordion type="single" collapsible defaultValue="item-1">
                <AccordionItem value="item-1" className="border-none">
                    <AccordionTrigger className="group flex items-center justify-start gap-2 font-normal">
                        <h2 className='flex items-center gap-2'>{title}</h2>
                    </AccordionTrigger>
                    <AccordionContent>
                        {children}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section >
    )
}


export default HomePanel