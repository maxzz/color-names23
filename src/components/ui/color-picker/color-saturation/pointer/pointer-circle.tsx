import { HsvaColor, hsvaToHslaString } from "../../color-convert";
import { Pointer, PointerProps } from "./default-pointer";

export function PointerView({ hsva, pointer}: { hsva?: HsvaColor; pointer?: ({ left, top, color }: PointerProps) => JSX.Element; }) {
    if (!hsva) {
        return null;
    }

    const comProps = {
        top: `${100 - hsva.v}%`,
        left: `${hsva.s}%`,
        color: hsvaToHslaString(hsva),
    };

    if (typeof pointer === 'function') {
        return pointer({ ...comProps });
    }

    return (
        <Pointer {...comProps} />
    );
}
