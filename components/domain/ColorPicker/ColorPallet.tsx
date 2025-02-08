import { ChangeEventHandler, FC, useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
    className?: string,
    selectColor: (_: string) => void,
}

const commonColors = [
    '#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#33FFF5', '#F533FF',
    '#333FFF', '#FF3333', '#33FFB8', '#FFB833', '#8D33FF', '#FF3380',
];

export const ColorPallet: FC<Props> = ({
    className,
    selectColor: handleColorClick
}) => {
    const [customColor, setCustomColor] = useState({ r: '', g: '', b: '' });
    const handleCustomColorChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        setCustomColor((before) => ({ ...before, [e.target.name]: e.target.value }));
    }, []);
    const applyCustomColor = () => {
        const { r, g, b } = customColor;
        const rgbColor = `rgb(${r || 0}, ${g || 0}, ${b || 0})`;
        handleColorClick(rgbColor);
    };
    return (
        <div className={cn(className, 'w-48 rounded-lg bg-white p-4')} onClick={(e) => {
            e.stopPropagation()
        }}>
            <div className="grid grid-cols-4 gap-2">
                {commonColors.map((color) => (
                    <button
                        key={color}
                        className="size-10 cursor-pointer rounded-full"
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorClick(color)}
                        aria-label={`Select color ${color}`}
                    />
                ))}
            </div>

            <div className="mt-4">
                <p>Custom Color</p>
                <div className="flex gap-2">
                    <input
                        type="number"
                        name="r"
                        value={customColor.r}
                        onChange={handleCustomColorChange}
                        placeholder="R"
                        className="w-12 border p-1 text-center"
                        max="255"
                        min="0"
                    />
                    <input
                        type="number"
                        name="g"
                        value={customColor.g}
                        onChange={handleCustomColorChange}
                        placeholder="G"
                        className="w-12 border p-1 text-center"
                        max="255"
                        min="0"
                    />
                    <input
                        type="number"
                        name="b"
                        value={customColor.b}
                        onChange={handleCustomColorChange}
                        placeholder="B"
                        className="w-12 border p-1 text-center"
                        max="255"
                        min="0"
                    />
                </div>
                {/* Custom Color Preview */}
                <div
                    className="mt-2 size-20 border"
                    style={{
                        backgroundColor: `rgb(${customColor.r || 0}, ${customColor.g || 0}, ${customColor.b || 0})`,
                    }}
                />
                <button
                    onClick={applyCustomColor}
                    className="mt-2 w-full rounded bg-blue-500 py-1 text-white"
                >
                    Confirm
                </button>
            </div>
        </div>
    )
}