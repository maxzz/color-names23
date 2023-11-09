import { ButtonHTMLAttributes, useRef, useState } from "react";
import { colorPickerState } from "../ui-state-color";
import { paletteList, palettePickerState } from "./ui-state-palette";
import { ShadesPopup, cellClasses } from "./01-shades-popup";
import { hexToHsva } from "../color-convert";
import { classNames } from "@/utils";
import { useSnapshot } from "valtio";

export function PaletteCell({ colorGroup, className, ...rest }: { colorGroup: string; } & ButtonHTMLAttributes<HTMLButtonElement>) {
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const [showShades, setShowShades] = useState(false);

    const {activePaletteIdx} = useSnapshot(palettePickerState);
    const palette = paletteList[activePaletteIdx];

    const group = palette.shades.get(colorGroup);
    const color = group?.[palette.defShadeIdx];
    if (!color) {
        return null;
    }
    const title = `${colorGroup.replace(/([A-Z])/g, ' $1').toLowerCase()} ${palette.shadeNames[palette.defShadeIdx]}\nLong click to show alternative shades`;
    return (
        <button
            className={classNames("group relative m-1 active:scale-95", cellClasses, className)}
            style={{ background: color }}
            tabIndex={-1}
            title={title}
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
            />
            
            <div
                className={classNames("absolute left-[5px] -top-[4px] opacity-0 group-hover:opacity-30", cellClasses, className)}
                style={{ background: color }}
            />

            <ShadesPopup colorGroup={colorGroup} open={showShades} setOpen={setShowShades} />
        </button>
    );
}
