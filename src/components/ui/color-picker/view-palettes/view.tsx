import { ButtonHTMLAttributes, HTMLAttributes, useRef, useState } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";
import { IconMenuBurger } from "../../icons";
import { Button } from "../../shadcn";
import { colorPickerState } from "../ui-state";
import { hexToHsva } from "../color-convert";
import { Popover, PopoverContent } from "../../shadcn/popover";

function AdditionalColorsPopup({open, setOpen, className, ...rest}: {open: boolean; setOpen: (open: boolean) => void; className?: string;}) {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverContent className="w-64">
                <div
                    className={classNames("w-6 h-6", cellClasses, className)}
                    style={{ background: 'red' }}
                />
            </PopoverContent>
        </Popover>
    );
}

const cellClasses = "w-4 h-4 rounded transition-opacity duration-500 delay-100";

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
                clearTimeout(timerId.current!);
                timerId.current = setTimeout(() => {
                    setShowShades(true);
                    console.log('show shades');

                }, 1500);

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
