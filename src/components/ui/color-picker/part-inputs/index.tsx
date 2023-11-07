import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { hsvaToHex, hsvaToHexa, hsvaToRgba } from "../color-convert";
import { colorPickerState } from "../ui-state";
import { classNames } from "@/utils";

const boxClasses = "flex flex-col items-center";
const inputClasses = "px-0 text-xs text-center h-6";
const labelClasses = "text-xs ";

function InputColorPart() {
    const snap = useSnapshot(colorPickerState);
    return (
        <div className={boxClasses}>
            <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
            <Label className={labelClasses}>R</Label>
        </div>
    );
}

export function ColorInputs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorPickerState);
    const hex = hsvaToHex(snap.hsvaColor);
    const rgba = hsvaToRgba(snap.hsvaColor);
    return (
        <div className={classNames("flex space-x-2", className)} {...rest}>
            <div className={`min-w-[72px] ${boxClasses}`}>
                <Input className={inputClasses} value={hex} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                <Label className={labelClasses}>Hex</Label>
            </div>
            <div className="flex space-x-1">
                <InputColorPart />
                <InputColorPart />
                <InputColorPart />
                <InputColorPart />
            </div>
        </div>
    );
}
