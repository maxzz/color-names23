import { HTMLAttributes, InputHTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { hsvaToHex, hsvaToHexa, hsvaToRgba } from "../color-convert";
import { colorPickerState } from "../ui-state-color";
import { classNames } from "@/utils";

const boxClasses = "flex flex-col items-center";
const inputClasses = "px-0 text-xs text-center h-6";
const labelClasses = "text-xs ";

function InputWithValidate({ value, onChange }: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & { value: number, onChange?: (value: number) => void; }) {
    const snap = useSnapshot(colorPickerState);
    function validate(event: React.ChangeEvent<HTMLInputElement>) {
        value = +event.target.value;
        onChange?.(value);
    }
    return (
        <Input className={inputClasses} value={value} onChange={validate} />
    );
}

function InputColorPart() {
    const snap = useSnapshot(colorPickerState);
    return (
        <div className={boxClasses}>
            <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
            <Label className={labelClasses}>R</Label>
        </div>
    );
}

function CurrentColor() {
    const snap = useSnapshot(colorPickerState);
    const hex = hsvaToHex(snap.hsvaColor);
    const rgba = hsvaToRgba(snap.hsvaColor);
    return (
        <div className={`min-w-[72px] flex items-center`}>
            <Label className={labelClasses}>Hex</Label>
            <Input className={inputClasses} value={hex} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
        </div>
    );
}

export function ColorInputs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    // const snap = useSnapshot(colorPickerState);
    // const hex = hsvaToHex(snap.hsvaColor);
    // const rgba = hsvaToRgba(snap.hsvaColor);
    return (
        <div className={classNames("flex justify-center space-x-2", className)} {...rest}>
            <CurrentColor />
        </div>
    );
}
