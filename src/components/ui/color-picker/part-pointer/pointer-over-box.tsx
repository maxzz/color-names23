import { useSnapshot } from "valtio";
import { DefaultPointer, PointerType } from "./default-pointer";
import { hsvaToHslaString } from "../color-convert";
import { colorPickerState } from "../ui-state";
import { HTMLAttributes } from "react";

const circleFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '18px',
        height: '18px',
        transform: isVerical ? 'translate(-9px, -9px)' : 'translate(-9px, -9px)',
        borderRadius: '50%',
    },
});

export function PointerOverBox({ pointer, isVerical  }: { pointer?: PointerType; isVerical?: boolean | undefined; }) {
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
        <DefaultPointer {...comProps} fillAttrs={circleFillProps(isVerical)} />
    );
}
