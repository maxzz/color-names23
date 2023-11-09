import { HTMLAttributes } from "react";
import { materialPalette } from "./palette-material-ui";
import { classNames } from "@/utils";
import { PaletteCell } from "./02-palette-cell";
import { PaletteMenu } from "./04-palette-menu";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("px-2 py-2 flex", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {materialPalette.colors.map((colorGroup, idx) => (
                    <PaletteCell colorGroup={colorGroup} key={idx} />
                ))}
            </div>

            <PaletteMenu />
        </div>
    );
}
