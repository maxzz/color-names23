import { useSnapshot } from "valtio";
import { hsvaToHslaString } from "../color-convert";
import { DefaultPointer, PointerProps } from "./default-pointer";
import { colorPickerState } from "../ui-state";

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

export function PointerCircle({ pointer }: { pointer?: PointerType; }) {
    const snap = useSnapshot(colorPickerState);

    const comProps = {
        top: `${100 - snap.hsvaColor.v}%`,
        left: `${snap.hsvaColor.s}%`,
        color: hsvaToHslaString(snap.hsvaColor),
    };

    if (typeof pointer === 'function') {
        return pointer(comProps);
    }

    return (
        <DefaultPointer {...comProps} />
    );
}
