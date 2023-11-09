import { useSnapshot } from "valtio";
import { DefaultPointer, pointerShadow } from "./default-pointer";
import { hsvaToHslaString } from "../color-convert";
import { colorPickerState } from "../ui-state-color";
import { HTMLAttributes } from "react";

const circleFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '16px',
        height: '16px',
        transform: isVerical ? 'translate(-7px, -7px)' : 'translate(-7px, -7px)',
        borderRadius: '50%',
        '--alpha-pointer-box-shadow': pointerShadow,
    },
});

export function PointerOverBox({ isVerical  }: { isVerical?: boolean | undefined; }) {
    const snap = useSnapshot(colorPickerState);

    const comProps = {
        top: `${100 - snap.hsvaColor.v}%`,
        left: `${snap.hsvaColor.s}%`,
        color: hsvaToHslaString(snap.hsvaColor),
    };

    return (
        <DefaultPointer {...comProps} fillAttrs={circleFillProps(isVerical)} />
    );
}
