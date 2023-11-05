import { CSSProperties, HTMLAttributes } from 'react';

export type PointerProps =
    & {
        left?: string;  //TODO: this is used as boolean
        top?: string;   //TODO: top is not used
        fillProps?: HTMLAttributes<HTMLDivElement>;
    }
    & HTMLAttributes<HTMLDivElement>;

const pointerShadow = 'rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px';

// controlled by --alpha-pointer-background-color

export function DefaultPointer({ left, top, style, fillProps, ...rest }: PointerProps) {
    const allStyles: CSSProperties = {
        position: 'absolute',
        left,
        top,
        ...style,
    };

    const stylePointer = {
        width: '18px',
        height: '18px',
        transform: left ? 'translate(-9px, -9px)' : 'translate(-9px, -9px)',
        borderRadius: '50%',

        backgroundColor: 'var(--alpha-pointer-background-color)',
        boxShadow: 'var(--alpha-pointer-box-shadow)',
        '--alpha-pointer-box-shadow': pointerShadow,
        ...fillProps?.style,
    } as CSSProperties;

    return (
        <div style={allStyles} {...rest}>
            <div style={stylePointer} {...fillProps} />
        </div>
    );
}
