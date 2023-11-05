import { CSSProperties, HTMLAttributes, forwardRef } from 'react';
import { HsvaColor } from '../color-convert';
import { Interaction, Interactive } from './react-drag-event-interactive';
import { PointerProps, PointerView } from './pointer';
import { classNames } from '@/utils';

export type SaturationProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    hsva?: HsvaColor; // hsva => `{ h: 0, s: 75, v: 82, a: 1 }`
    hue?: number;
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
            className={classNames('w-color-saturation', className)}
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
            <PointerView hsva={hsva} pointer={pointer} prefixCls={'w-color-saturation'} />
        </Interactive>
    );
});

Saturation.displayName = 'Saturation';
