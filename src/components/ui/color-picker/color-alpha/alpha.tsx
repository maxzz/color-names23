import React, { CSSProperties, FC, memo, useCallback, useMemo } from 'react';
import { HsvaColor, hsvaToHslaString } from '../color-convert';
import { Interactive, Interaction } from '../color-saturation';
import { Pointer, PointerProps } from '../color-saturation/Pointer';

export interface AlphaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    prefixCls?: string;
    width?: React.CSSProperties['width'];               // String, Pixel value for picker width. Default `316px`
    height?: React.CSSProperties['height'];             // String, Pixel value for picker height. Default `16px`
    hsva: HsvaColor;                                    // hsva => `{ h: 0, s: 75, v: 82, a: 1 }`
    pointer?: (props: PointerProps) => JSX.Element;     // React Component, Custom pointer component
    radius?: React.CSSProperties['borderRadius'];       // Set rounded corners.
    background?: string;                                // Set the background color.
    bgProps?: React.HTMLAttributes<HTMLDivElement>;     // Set the background element props.
    innerProps?: React.HTMLAttributes<HTMLDivElement>;  // Set the interactive element props.
    pointerProps?: PointerProps;
    direction?: 'vertical' | 'horizontal';              // String Enum, horizontal or vertical. Default `horizontal`
    onChange?: (newAlpha: { a: number; }, offset: Interaction) => void;
}

export const BACKGROUND_IMG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==';

export const Alpha = React.forwardRef<HTMLDivElement, AlphaProps>((props, ref) => {
    const {
        prefixCls = 'w-color-alpha',
        className,
        hsva,
        background,
        bgProps = {},
        innerProps = {},
        pointerProps = {},
        radius = 0,
        width,
        height = 16,
        direction = 'horizontal',
        style,
        onChange,
        pointer,
        ...rest
    } = props;

    const handleChange = (offset: Interaction) => {
        onChange?.({ ...hsva, a: direction === 'horizontal' ? offset.left : offset.top }, offset);
    };

    const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
    const innerBackground = `linear-gradient(to ${direction === 'horizontal' ? 'right' : 'bottom'}, rgba(244, 67, 54, 0) 0%, ${colorTo} 100%)`;
    const comProps: { left?: string; top?: string; } = {};

    if (direction === 'horizontal') {
        comProps.left = `${hsva.a * 100}%`;
    } else {
        comProps.top = `${hsva.a * 100}%`;
    }

    const styleWrapper = {
        '--alpha-background-color': '#fff',
        '--alpha-pointer-background-color': 'rgb(248, 248, 248)',
        '--alpha-pointer-box-shadow': 'rgb(0 0 0 / 37%) 0px 1px 4px 0px',
        borderRadius: radius,
        background: `url(${BACKGROUND_IMG}) left center`,
        backgroundColor: 'var(--alpha-background-color)',
        ...style,
        position: 'relative',
        ...{ width, height },
    } as CSSProperties;

    const pointerElement = typeof pointer === 'function'
        ? (
            pointer({ prefixCls, ...pointerProps, ...comProps })
        )
        : (
            <Pointer {...pointerProps} prefixCls={prefixCls} {...comProps} />
        );

    return (
        <div
            ref={ref}
            className={[prefixCls, `${prefixCls}-${direction}`, className || ''].filter(Boolean).join(' ')}
            style={styleWrapper}
            {...rest}
        >
            <div
                style={{
                    inset: 0,
                    position: 'absolute',
                    background: background || innerBackground,
                    borderRadius: radius,
                    ...bgProps.style,
                }}
                {...bgProps}
            />
            <Interactive
                style={{
                    ...innerProps.style,
                    inset: 0,
                    zIndex: 1,
                    position: 'absolute',
                }}
                onMove={handleChange}
                onDown={handleChange}
                {...innerProps}
            >
                {pointerElement}
            </Interactive>
        </div>
    );
});

Alpha.displayName = 'Alpha';
