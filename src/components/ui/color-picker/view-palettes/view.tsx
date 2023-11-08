import { ButtonHTMLAttributes, HTMLAttributes, useRef, useState } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";
import { IconMenuBurger } from "../../icons";
import { Button } from "../../shadcn";
import { colorPickerState } from "../ui-state";
import { hexToHsva } from "../color-convert";
import { Popover, PopoverContent } from "../../shadcn/popover";
import { Anchor } from "@radix-ui/react-popover";

function AdditionalColorsPopup({ open, setOpen, className, ...rest }: { open: boolean; setOpen: (open: boolean) => void; className?: string; }) {
    function onColorClick(color: string) {
        colorPickerState.hsvaColor = hexToHsva(color);
        setOpen(false);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <Anchor className="w-4 h-4" />
            <PopoverContent className="p-1 w-auto flex flex-col space-y-2 border-muted-foreground border">
                <div
                    className={classNames("w-3 h-3", cellClasses, className)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses, className)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses, className)}
                    style={{ background: 'red' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onColorClick('#ff00ff');
                    }}
                />
                <div
                    className={classNames("w-3 h-3", cellClasses, className)}
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

// const cellClasses = "w-4 h-4 rounded transition-opacity duration-500 delay-100";
// const cellClasses = "w-4 h-4 rounded transition-opacity [transition-duration:500] delay-100";
const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";

function PaletteCell({ className, color, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { color: string; }) {
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const [showShades, setShowShades] = useState(false);
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
                console.log('mousedown');

                clearTimeout(timerId.current!); //TODO: calc deff between mousedown and mouseup and do it on mouseup
                timerId.current = setTimeout(() => {
                    setShowShades(true);

                    console.log('show shades');
                }, 500);
            }}
            onMouseUp={(e) => {
                console.log('mouseup');

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
                {materialPalette.colors.map((color, idx) => (
                    <PaletteCell color={color} key={idx} />
                ))}
            </div>

            <Button variant={'outline'} size={'icon'} className="w-4 h-4 flex-none">
                <IconMenuBurger className="w-4 h-4" />
            </Button>
        </div>
    );
}
