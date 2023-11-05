import { useSnapshot } from "valtio";
import { DefaultPointer, PointerProps } from "../color-saturation";
import { colorPickerState } from "../ui-state";

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

export function PointerCircleAlpha({ pointer, direction }: { pointer?: PointerType; direction?: 'horizontal' | 'vertical' }) {
    const snap = useSnapshot(colorPickerState);

    const comProps: PointerProps = {};
    comProps[direction === 'vertical' ? 'top' : 'left'] = `${snap.hsvaColor.a * 100}%`;

    if (typeof pointer === 'function') {
        return pointer(comProps);
    }

    return (
        <DefaultPointer {...comProps} />
    );
}
