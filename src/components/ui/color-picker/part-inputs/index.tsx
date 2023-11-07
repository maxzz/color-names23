import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { hsvaToHex, hsvaToHexa } from "../color-convert";
import { colorPickerState } from "../ui-state";

const boxClasses = "flex flex-col items-center";
const inputClasses = "px-0 text-xs text-center h-6";
const labelClasses = "text-xs";

export function ColorInputs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorPickerState);
    const hex = hsvaToHex(snap.hsvaColor);
    return (
        <div className="flex space-x-2">
            <div className={`min-w-[72px] ${{boxClasses}}`}>
                <Input className={inputClasses} value={hex} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                <Label className={labelClasses}>Hex</Label>
            </div>
            <div className="flex space-x-1">
                <div className={boxClasses}>
                    <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                    <Label className={labelClasses}>R</Label>
                </div>
                <div className={boxClasses}>
                    <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                    <Label className={labelClasses}>G</Label>
                </div>
                <div className={boxClasses}>
                    <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                    <Label className={labelClasses}>B</Label>
                </div>
                <div className={boxClasses}>
                    <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
                    <Label className={labelClasses}>A</Label>
                </div>
            </div>
        </div>
    );
}
