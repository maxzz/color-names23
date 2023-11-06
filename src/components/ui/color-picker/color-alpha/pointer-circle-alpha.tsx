import { DefaultPointer, PointerProps } from "../color-saturation";

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

export function PointerCircleAlpha({ value, pointer, isVerical }: { value: number; pointer?: PointerType; isVerical?: boolean | undefined; }) {
    const comProps: PointerProps = {};
    comProps[isVerical ? 'top' : 'left'] = `${value * 100}%`;
    comProps[isVerical ? 'left' : 'top'] = '50%';

    if (typeof pointer === 'function') {
        return pointer(comProps);
    }

    return (
        <DefaultPointer {...comProps} />
    );
}
