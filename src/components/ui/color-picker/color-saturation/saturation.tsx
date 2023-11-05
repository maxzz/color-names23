import { CSSProperties, HTMLAttributes, forwardRef, useMemo } from 'react';
import { HsvaColor, hsvaToHslaString } from '../color-convert';
import { Interaction, Interactive } from './interactive';
import { Pointer, PointerProps, PointerView } from './pointer';
import { classNames } from '@/utils';

export type SaturationProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    prefixCls?: string;
    hsva?: HsvaColor; // hsva => `{ h: 0, s: 75, v: 82, a: 1 }`
    hue?: number;
    radius?: CSSProperties['borderRadius'];
    pointer?: ({ prefixCls, left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component
    onChange?: (newColor: HsvaColor) => void;
};

const containerStyle: CSSProperties = {
    width: 200,
    height: 200,
    position: 'relative',
};

export const Saturation = forwardRef<HTMLDivElement, SaturationProps>((props, ref) => {
    const {
        prefixCls = 'w-color-saturation',
        radius = 0,
        pointer,
        className,
        hue = 0,
        style,
        hsva,
        onChange,
        ...rest
    } = props;

    const handleChange = (interaction: Interaction, event: MouseEvent | TouchEvent) => {
        hsva && onChange?.({
            h: hsva.h,
            s: interaction.left * 100,
            v: (1 - interaction.top) * 100,
            a: hsva.a,
            // source: 'hsv',
        });
    };

    return (
        <Interactive
            ref={ref}
            className={classNames(prefixCls, className)}
            style={{
                position: 'absolute',
                inset: 0,
                cursor: 'crosshair',
                backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hsva?.h ?? hue}, 100%, 50%))`,
                ...containerStyle,
                borderRadius: radius,
                ...style,
            }}
            onMove={handleChange}
            onDown={handleChange}
            {...rest}
        >
            <PointerView hsva={hsva} pointer={pointer} prefixCls={prefixCls} />
        </Interactive>
    );
});

Saturation.displayName = 'Saturation';
