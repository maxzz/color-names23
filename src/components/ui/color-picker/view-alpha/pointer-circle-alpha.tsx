import { HTMLAttributes } from "react";
import { DefaultPointer, PointerProps } from "../view-saturation";

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

const circleFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '18px',
        height: '18px',
        transform: isVerical ? 'translate(-0px, -9px)' : 'translate(-9px, 1px)',
        borderRadius: '50%',
    },
});

export function PointerCircleAlpha({ value, pointer, isVerical }: { value: number; pointer?: PointerType; isVerical?: boolean | undefined; }) {
    const comProps: PointerProps = {};
    comProps[isVerical ? 'top' : 'left'] = `${value}%`;
    comProps[isVerical ? 'left' : 'top'] = '0%';

    if (typeof pointer === 'function') {
        return pointer(comProps);
    }

    return (
        <DefaultPointer {...comProps} {...circleFillProps(isVerical)} />
    );
}
