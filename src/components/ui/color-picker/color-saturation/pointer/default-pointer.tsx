import { CSSProperties, HTMLAttributes } from 'react';

export interface PointerProps extends HTMLAttributes<HTMLDivElement> {
    left?: string;
    top?: string;
    fillProps?: HTMLAttributes<HTMLDivElement>;
}

export const Pointer = ({ className, left, top, style, fillProps, ...rest }: PointerProps): JSX.Element => {
    const styleWrapper: CSSProperties = {
        position: 'absolute',
        left,
        top,
        ...style,
    };

    const stylePointer = {
        width: 18,
        height: 18,
        transform: left ? 'translate(-9px, -1px)' : 'translate(-1px, -9px)',
        borderRadius: '50%',
        '--saturation-pointer-box-shadow': 'rgb(255 255 255) 0px 0px 0px 1.5px, rgb(0 0 0 / 30%) 0px 0px 1px 1px inset, rgb(0 0 0 / 40%) 0px 0px 1px 2px',
        backgroundColor: 'var(--alpha-pointer-background-color)',
        boxShadow: 'var(--alpha-pointer-box-shadow)',
        ...fillProps?.style,
    } as CSSProperties;

    return (
        <div
            className={`interactive-pointer ${className || ''}`}
            style={styleWrapper}
            {...rest}
        >
            <div
                className={`interactive-fill`}
                {...fillProps}
                style={stylePointer}
            />
        </div>
    );
};