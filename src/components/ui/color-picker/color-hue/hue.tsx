import React from 'react';
import { Alpha, AlphaProps } from '../color-alpha';

export type HueProps =
    & {
        hue?: number;
        onChange?: (newHue: { h: number; }) => void;
    }
    & Omit<AlphaProps, 'hsva' | 'onChange'>;

const bkgGradient = (direction: string) => `
linear-gradient(to ${direction === 'horizontal' ? 'right' : 'bottom'}, \
rgb(255, 0, 0) 0%, \
rgb(255, 255, 0) 17%, \
rgb(0, 255, 0) 33%, \
rgb(0, 255, 255) 50%, \
rgb(0, 0, 255) 67%, \
rgb(255, 0, 255) 83%, \
rgb(255, 0, 0) 100%)`;

export const Hue = React.forwardRef<HTMLDivElement, HueProps>((props, ref) => {
    const {
        prefixCls = 'w-color-hue',
        className,
        hue = 0,
        onChange,
        direction = 'horizontal',
        ...rest
    } = props;
    return (
        <Alpha
            ref={ref}
            className={`${prefixCls} ${className || ''}`}
            direction={direction}
            background={bkgGradient(direction)}
            hsv={{ h: hue, s: 100, v: 100, a: hue / 360 }}
            onChange={(_, interaction) => {
                onChange?.({ h: direction === 'horizontal' ? 360 * interaction.left : 360 * interaction.top });
            }}
            {...rest}
        />
    );
});

Hue.displayName = 'Hue';
