import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";
import { IconMenuBurger } from "../../icons";
import { Button } from "../../shadcn";

const cellClassess = "w-4 h-4 rounded";

function PaletteCell({ className, color, ...rest }: HTMLAttributes<HTMLDivElement> & { color: string; }) {
    return (
        <div
            className={classNames("relative m-1", cellClassess, className)}
            style={{ background: color }}
            {...rest}
        >
            <div
                className={classNames("absolute left-[1px] -top-[8px] m-1 opacity-75", cellClassess, className)}
                style={{ background: color }}
            >
            </div>
            <div
                className={classNames("absolute left-[5px] -top-[13px] m-1 opacity-50", cellClassess, className)}
                style={{ background: color }}
            >
            </div>
        </div>
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
