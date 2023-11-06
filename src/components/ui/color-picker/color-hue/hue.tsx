import React from 'react';
import { Alpha, AlphaProps } from '../color-alpha';

export type HueProps =
    & {
        hue: number;
        onChange?: (newHue: number) => void;
    }
    & Omit<AlphaProps, 'hsv' | 'onChange'>;

const bkgGradient = (isVertical: boolean | undefined) => `
linear-gradient(to ${isVertical ? 'bottom' : 'right'}, \
rgb(255, 0, 0) 0%, \
rgb(255, 255, 0) 17%, \
rgb(0, 255, 0) 33%, \
rgb(0, 255, 255) 50%, \
rgb(0, 0, 255) 67%, \
rgb(255, 0, 255) 83%, \
rgb(255, 0, 0) 100%)`;

export const Hue = React.forwardRef<HTMLDivElement, HueProps>((props, ref) => {
    const {
        hue,
        onChange,
        isVertical,
        ...rest
    } = props;
    return (
        <Alpha
            ref={ref}
            isVertical={isVertical}
            background={bkgGradient(isVertical)}
            // hsv={{ h: hue, s: 100, v: 100, a: hue / 360 }}
            hsv={{ h: hue, s: 100, v: 100 }}

            onChange={(_, interaction) => {
                //console.log('hue handleChange', interaction.left);
                onChange?.(isVertical ? 360 * interaction.top : 360 * interaction.left);
            }}

            {...rest}
        />
    );
});

Hue.displayName = 'Hue';
