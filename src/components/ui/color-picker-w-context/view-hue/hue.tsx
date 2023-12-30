import { forwardRef } from 'react';
import { Alpha, AlphaProps } from '../view-alpha';

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

export const Hue = forwardRef<HTMLDivElement, HueProps>(({ hue, onChange, isVertical, ...rest }, ref) => {
    return (
        <Alpha
            ref={ref}
            hsv={{ h: hue, s: 100, v: 100 }}
            onChange={(_, interaction) => onChange?.(Math.round(isVertical ? 360 * interaction.top : 360 * interaction.left))}
            style={{background: ''}}
            background={bkgGradient(isVertical)}
            isVertical={isVertical}
            {...rest}
        />
    );
});

Hue.displayName = 'Hue';
