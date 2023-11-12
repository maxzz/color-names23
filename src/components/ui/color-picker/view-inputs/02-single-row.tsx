import { HTMLAttributes, InputHTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { hsvaToHex, hsvaToHexa, hsvaToHsla, hsvaToHslaString, hsvaToRgba, hsvaToRgbaString } from "../color-convert";
import { colorPickerState } from "../ui-state-color";
import { classNames } from "@/utils";
import { formatList, formatPickerState } from "../ui-state-format";

const boxClasses = "flex flex-col items-center";
const inputClasses = "px-0 text-xs text-center h-6";
const labelClasses = "text-xs ";

// function InputWithValidate({ value, onChange }: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & { value: number, onChange?: (value: number) => void; }) {
//     const snap = useSnapshot(colorPickerState);
//     function validate(event: React.ChangeEvent<HTMLInputElement>) {
//         value = +event.target.value;
//         onChange?.(value);
//     }
//     return (
//         <Input className={inputClasses} value={value} onChange={validate} />
//     );
// }

// function InputColorPart() {
//     const snap = useSnapshot(colorPickerState);
//     return (
//         <div className={boxClasses}>
//             <Input className={inputClasses} value={snap.hsvaColor.h} onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value} />
//             <Label className={labelClasses}>R</Label>
//         </div>
//     );
// }

export function CurrentColor({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const { hsvaColor } = useSnapshot(colorPickerState, { sync: true });
    const { formatIdx } = useSnapshot(formatPickerState);
    const currentFormat = formatList[formatIdx];

    const txt =
        currentFormat.format === 'hex'
            ? hsvaColor.a === 1
                ? hsvaToHex(hsvaColor)
                : hsvaToHexa(hsvaColor)
            : currentFormat.format === 'rgb'
                ? hsvaToRgbaString(hsvaColor)
                : currentFormat.format === 'hsl'
                    ? hsvaToHslaString(hsvaColor)
                    : '';
                    
    const rgba = hsvaToRgba(hsvaColor);
    return (
        <div className={classNames("min-w-[72px] flex items-center space-x-2", className)} {...rest}>
            <Label className={labelClasses}>{currentFormat.name}</Label>
            <Input
                className={inputClasses}
                value={txt}
                onChange={(e) => colorPickerState.hsvaColor.h = +e.target.value}
                role="presentation"
                autoComplete="off"
            />
        </div>
    );
}
