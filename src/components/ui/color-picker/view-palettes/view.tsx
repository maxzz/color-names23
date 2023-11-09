import { ButtonHTMLAttributes, Fragment, HTMLAttributes, useRef, useState } from "react";
import { colorPickerState } from "../ui-state";
import { Button, Popover, PopoverAnchor, PopoverContent } from "../../shadcn";
import { materialPalette } from "./palette-material-ui";
import { hexToHsva } from "../color-convert";
import { IconMenuBurger } from "../../icons";
import { classNames } from "@/utils";

function ShadesPopup({ colorGroup, open, setOpen, className, ...rest }: { colorGroup: string; open: boolean; setOpen: (open: boolean) => void; className?: string; }) {
    const group = materialPalette.shades.get(colorGroup)!;
    function onColorClick(color: string) {
        colorPickerState.hsvaColor = hexToHsva(color);
        setOpen(false);
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverAnchor className="w-4 h-4" />
            <PopoverContent className={classNames("p-1 w-auto text-[.65rem] flex flex-col space-y-2 border-muted-foreground border !duration-ani-300", className)} {...rest}>
                {group.map((color, idx) => (
                    <Fragment key={idx}>
                        {idx === materialPalette.extraIdx && (
                            <div className="-mx-1 h-px bg-muted-foreground/50" />
                        )}

                        <div className="">
                            <div className="">
                                {materialPalette.shadeNames[idx]}
                            </div>
                            <div
                                className={classNames("w-3 h-3", cellClasses)}
                                style={{ background: color }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    onColorClick(color);
                                }}
                            />
                        </div>

                        {/* <div
                            className={classNames("w-3 h-3", cellClasses)}
                            style={{ background: color }}
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                onColorClick(color);
                            }}
                        /> */}
                    </Fragment>
                ))}
            </PopoverContent>
        </Popover>
    );
}

const cellClasses = "w-4 h-4 rounded transition-opacity delay-100";

function PaletteCell({ colorGroup, className, ...rest }: { colorGroup: string; } & ButtonHTMLAttributes<HTMLButtonElement>) {
    const timerId = useRef<NodeJS.Timeout | null>(null);
    const [showShades, setShowShades] = useState(false);
    const group = materialPalette.shades.get(colorGroup);
    const color = group?.[materialPalette.defShadeIdx];
    if (!color) {
        return null;
    }
    return (
        <button
            className={classNames("group relative m-1 active:scale-95", cellClasses, className)}
            style={{ background: color }}
            tabIndex={-1}
            title={`${colorGroup}\nLong click to show alternative shades`}
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
            >
            </div>
            <div
                className={classNames("absolute left-[5px] -top-[4px] opacity-0 group-hover:opacity-30", cellClasses, className)}
                style={{ background: color }}
            >
            </div>

            <ShadesPopup colorGroup={colorGroup} open={showShades} setOpen={setShowShades} />
        </button>
    );
}

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
