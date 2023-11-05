import { HsvaColor, hsvaToHslaString } from "../../color-convert";
import { Pointer, PointerProps } from "./default-pointer";

export function PointerView({ hsva, pointer, prefixCls }: { hsva?: HsvaColor; pointer?: ({ prefixCls, left, top, color }: PointerProps) => JSX.Element; prefixCls?: string; }) {
    if (!hsva) {
        return null;
    }

    const comProps = {
        top: `${100 - hsva.v}%`,
        left: `${hsva.s}%`,
        color: hsvaToHslaString(hsva),
    };

    if (typeof pointer === 'function') {
        return pointer({ prefixCls, ...comProps });
    }

    return (
        <Pointer prefixCls={prefixCls} {...comProps} />
    );
}
