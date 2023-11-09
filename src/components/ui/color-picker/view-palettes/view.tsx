import { ButtonHTMLAttributes, HTMLAttributes, useRef, useState } from "react";
import { colorPickerState } from "../ui-state";
import { Button, Popover, PopoverAnchor, PopoverContent } from "../../shadcn";
import { materialPalette } from "./material-palette";
import { hexToHsva } from "../color-convert";
import { IconMenuBurger } from "../../icons";
import { classNames } from "@/utils";

function AdditionalColorsPopup({ open, setOpen, className, ...rest }: { open: boolean; setOpen: (open: boolean) => void; className?: string; }) {
    function onColorClick(color: string) {
        colorPickerState.hsvaColor = hexToHsva(color);
        setOpen(false);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className="w-4 h-4" />
            <PopoverContent className={classNames("p-1 w-auto flex flex-col space-y-2 border-muted-foreground border !duration-ani-300", className)} {...rest}>
                <div
                    className={classNames("w-3 h-3", cellClasses)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}

const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";

function PaletteCell({ colorGroup, className, ...rest }: { colorGroup: string; } & ButtonHTMLAttributes<HTMLButtonElement>) {
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const [showShades, setShowShades] = useState(false);
    const colorgroup = materialPalette.shades.get(colorGroup);
    const color = colorgroup?.[materialPalette.shadeIdx] || '';
    return (
        <button
            className={classNames("group relative m-1 active:scale-95", cellClasses, className)}
            style={{ background: color }}
            title={`Long click to show alternative shades of ${color}`}
            onClick={(e) => {
                e.stopPropagation();
                colorPickerState.hsvaColor = hexToHsva(color);
            }}
            onMouseDown={(e) => {
                clearTimeout(timerId.current!);
                timerId.current = setTimeout(() => setShowShades(true), 500);
            }}
            onMouseUp={(e) => {
                clearTimeout(timerId.current!);
            }}
            {...rest}
        >
            <div
                className={classNames("absolute left-[3px] -top-[2px] opacity-0 group-hover:opacity-60", cellClasses, className)}
                style={{ background: color }}
            >
            </div>
            <div
                className={classNames("absolute left-[5px] -top-[4px] opacity-0 group-hover:opacity-30", cellClasses, className)}
                style={{ background: color }}
            >
            </div>

            <AdditionalColorsPopup open={showShades} setOpen={setShowShades} />
        </button>
    );
}

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 flex space-x-2", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((colorGroup, idx) => (
                    <PaletteCell colorGroup={colorGroup} key={idx} />
                ))}
            </div>

            <Button variant={'outline'} size={'icon'} className="w-4 h-4 flex-none">
                <IconMenuBurger className="w-4 h-4" />
            </Button>
        </div>
    );
}
