import { CSSProperties, HTMLAttributes } from 'react';

export type PointerType = ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component

export type PointerProps =
    & {
        left?: string;  //TODO: this is used as boolean
        top?: string;   //TODO: top is not used
        isVertical?: boolean;
        fillAttrs?: HTMLAttributes<HTMLDivElement>;
    }
    & HTMLAttributes<HTMLDivElement>;

const pointerShadow = 'rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px';

// controlled by --alpha-pointer-background-color

export function DefaultPointer({ left, top, style, isVertical, fillAttrs: fillProps, ...rest }: PointerProps) {
    const pointerStyles: CSSProperties = {
        position: 'absolute',
        left,
        top,
        ...style,
    };

    const { style: fillStyles, ...restFillAttrs } = fillProps || {};

    const AllFillStyles = {
        width: '18px',
        height: '18px',
        transform: isVertical ? 'translate(-1px, -9px)' : 'translate(-9px, -1px)',
        borderRadius: '50%',

        backgroundColor: 'var(--alpha-pointer-background-color)',
        boxShadow: 'var(--alpha-pointer-box-shadow)',
        '--alpha-pointer-box-shadow': pointerShadow,
        ...fillStyles,
    } as CSSProperties;

    return (
        <div style={pointerStyles} {...rest}>
            <div style={AllFillStyles} {...restFillAttrs} />
        </div>
    );
}
