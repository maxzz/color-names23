import { CSSProperties, Children, HTMLAttributes, forwardRef } from 'react';
import { HsvaColor } from '../color-convert';
import { Interaction, Interactive } from './react-drag-event-interactive';
import { PointerProps, PointerView } from './pointer';
import { classNames } from '@/utils';

export type SaturationProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    hue: number;
    radius?: CSSProperties['borderRadius'];
    pointer?: ({ left, top, color }: PointerProps) => JSX.Element; // React Component, Custom pointer component
    onChange?: (newColor: HsvaColor) => void;
};

const containerStyle: CSSProperties = {
    width: 200,
    height: 200,
    position: 'relative',
};

export const Saturation = forwardRef<HTMLDivElement, SaturationProps>((props, ref) => {
    const {
        radius = 0,
        pointer,
        className,
        hue,
        style,
        onChange,
        children,
        ...rest
    } = props;

    const handleChange = (interaction: Interaction, event: MouseEvent | TouchEvent) => {
        onChange?.({
            h: hue,
            s: interaction.left * 100,
            v: (1 - interaction.top) * 100,
            a: 1, // alpha controlled from outside
            // source: 'hsv',
        });
    };

    return (
        <Interactive
            ref={ref}
            className={classNames('w-color-saturation', className)}
            style={{
                position: 'absolute',
                inset: 0,
                cursor: 'crosshair',
                backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue}, 100%, 50%))`,
                ...containerStyle,
                borderRadius: radius,
                ...style,
            }}
            onMove={handleChange}
            onDown={handleChange}
            {...rest}
        >
            {children}
        </Interactive>
    );
});

Saturation.displayName = 'Saturation';
