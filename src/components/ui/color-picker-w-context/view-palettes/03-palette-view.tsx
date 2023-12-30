import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { palettePickerState, paletteList } from "./ui-state-palette";
import { PaletteCell } from "./02-palette-cell";
import { PaletteMenu } from "./04-palette-menu";
import { classNames } from "@/utils";

export function PaletteSelector({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const {activePaletteIdx} = useSnapshot(palettePickerState);
    const palette = paletteList[activePaletteIdx];
    if (!palette) {
        return null;
    }
    return (
        <div className={classNames("px-2 py-2 flex", className)} {...rest}>

            <div className="flex-1 flex flex-wrap">
                {palette.colors.map((colorGroup, idx) => (
                    <PaletteCell colorGroup={colorGroup} key={idx} />
                ))}
            </div>

            <PaletteMenu />
        </div>
    );
}
