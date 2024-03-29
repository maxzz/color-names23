import { HTMLAttributes, InputHTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { hsvaToHex, hsvaToHexa, hsvaToRgba } from "../color-convert";
//import { colorPickerState } from "../ui-state-color";
import { classNames } from "@/utils";
import { useColorPickerContext } from "..";

const boxClasses = "flex flex-col items-center";
const inputClasses = "px-0 text-xs text-center h-6";
const labelClasses = "text-xs ";

function InputWithValidate({value, onChange}: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {value: number, onChange?: (value: number) => void}) {
    const ctx = useColorPickerContext();
    const snap = useSnapshot(ctx.color);
    function validate(event: React.ChangeEvent<HTMLInputElement>) {
        value = +event.target.value;
        onChange?.(value);
    }
    return (
        <Input className={inputClasses} value={value} onChange={validate} />
    );
}

function InputColorPart() {
    const ctx = useColorPickerContext();
    const snap = useSnapshot(ctx.color);
    return (
        <div className={boxClasses}>
            <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => ctx.color.hsvaColor.h = +e.target.value} />
            <Label className={labelClasses}>R</Label>
        </div>
    );
}

function ColorInputs({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const ctx = useColorPickerContext();
    const snap = useSnapshot(ctx.color);
    const hex = hsvaToHex(snap.hsvaColor);
    const rgba = hsvaToRgba(snap.hsvaColor);
    return (
        <div className={classNames("flex space-x-2", className)} {...rest}>
            <div className={`min-w-[72px] ${boxClasses}`}>
                <Input className={inputClasses} value={hex} onChange={(e) => ctx.color.hsvaColor.h = +e.target.value} />
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
