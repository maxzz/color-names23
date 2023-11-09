import { HTMLAttributes } from "react";
import { Button } from "../../shadcn";
import { materialPalette } from "./palette-material-ui";
import { IconMenuBurger } from "../../icons";
import { classNames } from "@/utils";
import { PaletteCell } from "./02-palette-cell";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-2 py-2 flex ", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((colorGroup, idx) => (
                    <PaletteCell colorGroup={colorGroup} key={idx} />
                ))}
            </div>

            <Button variant={'outline'} size={'icon'} className="p-0.5 w-5 h-5 flex-none">
                <IconMenuBurger />
            </Button>
        </div>
    );
}
