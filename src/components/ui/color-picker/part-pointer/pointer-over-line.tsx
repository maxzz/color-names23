import { HTMLAttributes } from "react";
import { DefaultPointer, PointerProps } from "./default-pointer";

const circleFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '18px',
        height: '18px',
        transform: isVerical ? 'translate(-0px, -9px)' : 'translate(-9px, 0px)',
        borderRadius: '50%',
    },
});

const boxFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '4px',
        height: '100%',
        transform: isVerical ? 'translate(-0px, -4px)' : 'translate(-2px, 0px)',
        borderRadius: '1px',
    },
});

export function PointerOverLine({ value, isVerical }: { value: number; isVerical?: boolean | undefined; }) {
    const comProps: PointerProps = {};
    comProps[isVerical ? 'top' : 'left'] = `${value}%`;
    comProps[isVerical ? 'left' : 'top'] = '0%';

    return (
        <DefaultPointer {...comProps} className="h-full" fillAttrs={circleFillProps(isVerical)} />
    );
}
