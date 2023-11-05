import { HsvaColor, hsvaToHslaString } from "../../color-convert";
import { DefaultPointer, PointerProps } from "./default-pointer";

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

export function PointerView({ hsva, pointer }: { hsva?: HsvaColor; pointer?: PointerType; }) {
    if (!hsva) {
        return null;
    }

    const comProps = {
        top: `${100 - hsva.v}%`,
        left: `${hsva.s}%`,
        color: hsvaToHslaString(hsva),
    };

    if (typeof pointer === 'function') {
        return pointer(comProps);
    }

    return (
        <DefaultPointer {...comProps} />
    );
}
