import { useState, useEffect } from "react";

const useSplit = ({
    onDragEnd,
    onDragStart,
    minWidth,
    maxWidth
}: {
    onDragEnd?: (_: number) => void,
    onDragStart?: (_: number) => void,
    minWidth?: number,
    maxWidth?: number
}) => {
    const [root, setRoot] = useState<HTMLElement | null>(null)
    const [gutter, setGutter] = useState<HTMLElement | null>(null)
    const [moving, setMoving] = useState(false)

    useEffect(() => {
        if (!gutter || !root) {
            return
        }
        if (root.childNodes.length < 3) {
            console.error('child nodes must be 3 or more')
            return
        }
        let unregisters: (() => void)[] = []
        const clear = () => {
            unregisters.forEach(f => f())
            unregisters = []
        }
        const stop = (e: MouseEvent) => {
            setMoving(false)
            const w = (minWidth && minWidth >= e.clientX) ? minWidth :
                maxWidth && maxWidth <= e.clientX ? maxWidth :
                    e.clientX
            root.children[0].setAttribute('style', `width:${w}px`)
            if (onDragEnd) {
                onDragEnd(w)
            }
            clear()
        }
        const move = (e: MouseEvent) => {
            if (unregisters.length === 0) {
                return
            }
            if ((maxWidth && e.clientX > maxWidth) || (minWidth && e.clientX < minWidth)) {
                return
            }
            root.children[0].setAttribute('style', `width:${e.clientX}px`);
        }
        const dragstart = (e: MouseEvent) => {
            e.preventDefault()
            setMoving(true)
            if (onDragStart) {
                onDragStart(e.clientX)
            }
            window.addEventListener('mousemove', move)
            window.addEventListener('mouseup', stop)
            unregisters.push(
                () => { window.removeEventListener('mousemove', move) },
                () => { window.removeEventListener('mouseup', stop) }
            )
        }

        gutter.addEventListener('mousedown', dragstart)

        return () => {
            gutter.removeEventListener('mousedown', dragstart)
            clear()
        }
    }, [root, gutter, onDragEnd, onDragStart, minWidth, maxWidth])
    return {
        setRoot,
        setGutter,
        moving
    }
}

export default useSplit