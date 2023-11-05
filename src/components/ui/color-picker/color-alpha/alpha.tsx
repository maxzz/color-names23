import React, { CSSProperties, FC, memo, useCallback, useMemo } from 'react';
import { HsvaColor, hsvaToHslaString } from '../color-convert';
import { Interactive, Interaction } from '../color-saturation';

export interface AlphaProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    hsva: HsvaColor;                                    // hsva => `{ h: 0, s: 75, v: 82, a: 1 }`
    onChange?: (newAlpha: number, offset: Interaction) => void;

    // width?: React.CSSProperties['width'];               // String, Pixel value for picker width. Default `316px`
    // height?: React.CSSProperties['height'];             // String, Pixel value for picker height. Default `16px`
    radius?: React.CSSProperties['borderRadius'];       // Set rounded corners.
    background?: string;                                // Set the background color.
    bgProps?: React.HTMLAttributes<HTMLDivElement>;     // Set the background element props.
    innerProps?: React.HTMLAttributes<HTMLDivElement>;  // Set the interactive element props.
    direction?: 'vertical' | 'horizontal';
}

export const BACKGROUND_IMG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==';

export const Alpha = React.forwardRef<HTMLDivElement, AlphaProps>((props, ref) => {
    const {
        hsva,
        background,
        bgProps = {},
        innerProps = {},
        radius = 0,
        // width,
        // height = 16,
        direction = 'horizontal',
        style,
        onChange,
        children,
        ...rest
    } = props;

    function handleChange(offset: Interaction) {
        onChange?.(direction === 'horizontal' ? offset.left : offset.top, offset);
    }

    const colorTo = hsvaToHslaString(Object.assign({}, hsva, { a: 1 }));
    const innerBackground = `linear-gradient(to ${direction === 'horizontal' ? 'right' : 'bottom'}, rgba(244, 67, 54, 0) 0%, ${colorTo} 100%)`;

    const styleWrapper = {
        position: 'relative',
        '--alpha-background-color': '#fff',
        '--alpha-pointer-background-color': 'rgb(248, 248, 248)',
        '--alpha-pointer-box-shadow': 'rgb(0 0 0 / 37%) 0px 1px 4px 0px',
        background: `url(${BACKGROUND_IMG}) left center`,
        backgroundColor: 'var(--alpha-background-color)',
        borderRadius: radius,
        ...style,
        // ...{ width, height },
    } as CSSProperties;

    return (
        <div ref={ref} style={styleWrapper} {...rest}>
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
                {children}
            </Interactive>
        </div>
    );
});

Alpha.displayName = 'Alpha';
