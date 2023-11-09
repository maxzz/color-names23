import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { colorPickerState } from "../ui-state-color";
import { paletteList, palettePickerState } from "./ui-state-palette";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn";
import { hexToHsva } from "../color-convert";
import { classNames } from "@/utils";

type ShadesPopupProps = {
    colorGroup: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    className?: string;
};

export const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";
export const contentClasses = "\
p-1 \
w-auto \
text-[.65rem] \
space-y-2 \
border-muted-foreground \
border \
!duration-ani-300 \
select-none \
grid grid-cols-[auto,auto] gap-x-1";

export function ShadesPopup({ colorGroup, open, setOpen, className, ...rest }: ShadesPopupProps) {
    const {activePaletteIdx} = useSnapshot(palettePickerState);
    const palette = paletteList[activePaletteIdx];

    const group = palette.shades.get(colorGroup)!;

    function onColorClick(color: string) {
        colorPickerState.hsvaColor = hexToHsva(color);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className="w-4 h-4" />
            <PopoverContent className={classNames(contentClasses, className)} align="end" alignOffset={-4} {...rest}>
                {group.map((color, idx) => (
                    <Fragment key={idx}>
                        {idx === palette.extraIdx && (
                            <div className="col-span-2 -mx-1 h-px bg-muted-foreground/50" />
                        )}

                        <div className="col-span-2 grid [grid-template-columns:subgrid]">
                            <div className="text-right">
                                {palette.shadeNames[idx]}
                            </div>
                            <div
                                className={classNames("w-3 h-3 cursor-pointer active:scale-95", cellClasses)}
                                style={{ background: color }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onColorClick(color);
                                }}
                            />
                        </div>
                    </Fragment>
                ))}
            </PopoverContent>
        </Popover>
    );
}
