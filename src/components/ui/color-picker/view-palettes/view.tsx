import { ButtonHTMLAttributes, HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";
import { IconMenuBurger } from "../../icons";
import { Button } from "../../shadcn";
import { colorPickerState } from "../ui-state";
import { hexToHsva } from "../color-convert";

const cellClasses = "w-4 h-4 rounded transition-opacity duration-500 delay-100";

function PaletteCell({ className, color, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { color: string; }) {
    return (
        <button
            className={classNames("group relative m-1 active:scale-95", cellClasses, className)}
            style={{ background: color }}
            title={`Long click to show alternative shades of ${color}`}
            onClick={(e) => {
                e.stopPropagation();
                colorPickerState.hsvaColor = hexToHsva(color);
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
        </button>
    );
}

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 flex space-x-2", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((color, idx) => (
                    <PaletteCell color={color} />
                ))}
            </div>

            <Button variant={'outline'} size={'icon'} className="w-4 h-4 flex-none">
                <IconMenuBurger className="w-4 h-4" />
            </Button>
        </div>
    );
}
