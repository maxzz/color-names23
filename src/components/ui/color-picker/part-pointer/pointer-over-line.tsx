import { HTMLAttributes } from "react";
import { DefaultPointer, PointerProps, pointerShadow } from "./default-pointer";

const circleFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '18px',
        height: '18px',
        transform: isVerical ? 'translate(-0px, -9px)' : 'translate(-9px, 0px)',
        borderRadius: '50%',
        '--alpha-pointer-box-shadow': pointerShadow,
    },
});

const boxFillProps = (isVerical: boolean | undefined): HTMLAttributes<HTMLDivElement> => ({
    style: {
        width: '6px',
        height: '100%',
        transform: isVerical ? 'translate(-0px, -3px)' : 'translate(-3px, 0px)',
        borderRadius: '1px',
        '--alpha-pointer-box-shadow': pointerShadow,
    },
});

export function PointerOverLine({ value, isVerical, doBox = true }: { value: number; isVerical?: boolean | undefined; doBox?: boolean; }) {
    const comProps: PointerProps = {};
    comProps[isVerical ? 'top' : 'left'] = `${value}%`;
    comProps[isVerical ? 'left' : 'top'] = '0%';

    return (
        <DefaultPointer {...comProps} className="h-full" fillAttrs={doBox ? boxFillProps(isVerical) : circleFillProps(isVerical)} />
    );
}
