import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/shadcn";
import { CombinedPicker } from "@/components/ui/color-picker";
import { classNames } from "@/utils";
import { Dispatch, HTMLAttributes, RefObject, SetStateAction } from "react";

type ShowPickerProps = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    anchorRef: RefObject<HTMLElement>;
} & HTMLAttributes<HTMLDivElement>;

export function ShowPicker({ open, setOpen, anchorRef, className, ...rest }: ShowPickerProps) {
    return (
        <div className="absolute">
            {/* <Popover open={open} onOpenChange={() => setTimeout(() => setOpen(false), 100)}> */}
            <Popover
                open={open}
                onOpenChange={() => setTimeout(() => {
                    console.log('onOpenChange. set false');
                    setOpen(false);
                }, 100)}
            >
                <PopoverAnchor className="relative w-0 h-0" virtualRef={anchorRef} />
                <PopoverContent className={classNames("mx-1 p-0 w-auto border-none", className)} {...rest}>
                    <CombinedPicker />
                </PopoverContent>
            </Popover>
        </div>
    );
}
