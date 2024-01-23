import { Fragment } from "react";
import { useSnapshot } from "valtio";
//import { colorPickerState } from "../ui-state-color";
import { paletteList, palettePickerState } from "./ui-state-palette";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn";
import { hexToHsva } from "../color-convert";
import { classNames } from "@/utils";
import { useColorPickerContext } from "..";

type ShadesPopupProps = {
    colorGroup: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    className?: string;
};

export const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";
export const contentClasses = "\
p-0 \
w-auto \
!duration-ani-300 \
select-none \
ring-0 \
border-0 \
bg-transparent \
shadow-none \
grid grid-cols-[auto,auto]";

export const popupClasses = "\
p-1 \
w-auto \
text-[.65rem] \
space-y-2 \
border-muted-foreground \
border \
rounded \
bg-background \
shadow \
!duration-ani-300 \
select-none \
grid grid-cols-[auto,auto] gap-x-1";

export function ShadesPopup({ colorGroup, open, setOpen, className, ...rest }: ShadesPopupProps) {
    const ctx = useColorPickerContext();
    const { activePaletteIdx } = useSnapshot(palettePickerState);
    const palette = paletteList[activePaletteIdx];

    const group = palette.shades.get(colorGroup)!;

    function onColorClick(color: string) {
        ctx.color.hsvaColor = hexToHsva(color);
        setOpen(false);
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className="w-4 h-4" />
            <PopoverContent className={classNames(contentClasses, className)} align="end" alignOffset={-4} {...rest}>

                <div className="px-[3px] py-1.5 text-xs tracking-wider text-muted-foreground [writing-mode:vertical-rl] rotate-180 scale-x-125 flex space-y-1">
                    <div className="text-muted-foreground/70">{palette.title}</div>
                    <div className="">{colorGroup.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                </div>

                <div className={`${popupClasses}`}>
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

                </div>
            </PopoverContent>
        </Popover>
    );
}
