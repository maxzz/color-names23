import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { MaterialPaletteShades, materialPalette } from "./material-palette";
import { IconMenuBurger } from "../../icons";
import { Button } from "../../shadcn";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-3 py-2 flex space-x-2", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((color, idx) => (
                    <div
                        className={classNames("m-1 w-3 h-3 rounded")}
                        style={{ background: color }}
                        key={idx}
                    />
                ))}
            </div>

            <Button variant={'outline'} size={'icon'} className="w-4 h-4 flex-none">
                <IconMenuBurger className="w-4 h-4" />
            </Button>
        </div>
    );
}
