import { Fragment } from "react";
import { colorPickerState } from "../ui-state";
import { Popover, PopoverAnchor, PopoverContent } from "../../shadcn";
import { materialPalette } from "./palette-material-ui";
import { hexToHsva } from "../color-convert";
import { classNames } from "@/utils";

export const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";

export function ShadesPopup({ colorGroup, open, setOpen, className, ...rest }: { colorGroup: string; open: boolean; setOpen: (open: boolean) => void; className?: string; }) {
    const group = materialPalette.shades.get(colorGroup)!;
    function onColorClick(color: string) {
        colorPickerState.hsvaColor = hexToHsva(color);
        setOpen(false);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className="w-4 h-4" />
            <PopoverContent className={classNames("p-1 w-auto text-[.65rem] space-y-2 border-muted-foreground border !duration-ani-300 grid grid-cols-[auto,auto] gap-x-1", className)} {...rest}>
                {group.map((color, idx) => (
                    <Fragment key={idx}>
                        {idx === materialPalette.extraIdx && (
                            <div className="col-span-2 -mx-1 h-px bg-muted-foreground/50" />
                        )}

                        <div className="col-span-2 grid [grid-template-columns:subgrid]">
                            <div className="text-right">
                                {materialPalette.shadeNames[idx]}
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
