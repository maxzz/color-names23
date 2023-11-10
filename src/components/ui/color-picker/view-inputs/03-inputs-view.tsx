import { HTMLAttributes } from "react";
import { CurrentColor } from "./02-single-row";
import { classNames } from "@/utils";

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
