import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { Input, Label } from "../../shadcn";
import { HsvaColor, hsvaToHex, hsvaToHexa, hsvaToHslaString, hsvaToRgbaString } from "../color-convert";
//import { colorPickerState } from "../ui-state-color";
import { classNames } from "@/utils";
import { FormatItem, formatList, formatPickerState } from "../ui-state-format";
import { useColorPickerContext } from "..";

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

function colorTextByFormat(format: FormatItem['format'], hsvaColor: HsvaColor): string {
    console.log("formatToText", format, hsvaColor);
    
    const txt =
        format === 'hex'
            ? hsvaColor.a === 1
                ? hsvaToHex(hsvaColor)
                : hsvaToHexa(hsvaColor)
            : format === 'rgb'
                ? hsvaToRgbaString(hsvaColor)
                : format === 'hsl'
                    ? hsvaToHslaString(hsvaColor)
                    : '';
    return txt;
}

export function CurrentColor({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const ctx = useColorPickerContext();
    const { hsvaColor } = useSnapshot(ctx.color, { sync: true });
    const { formatIdx } = useSnapshot(formatPickerState);
    const currentFormat = formatList[formatIdx];

    const txt = colorTextByFormat(currentFormat.format, hsvaColor);

    return (
        <div className={classNames("min-w-[72px] flex items-center space-x-2", className)} {...rest}>
            <Label className={labelClasses}>{currentFormat.name}</Label>
            <Input
                className={inputClasses}
                value={txt}
                onChange={(e) => ctx.color.hsvaColor.h = +e.target.value}
                role="presentation"
                autoComplete="off"
                spellCheck="false"
            />
        </div>
    );
}
