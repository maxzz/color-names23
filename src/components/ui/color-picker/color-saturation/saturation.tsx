import { CSSProperties, HTMLAttributes, forwardRef } from 'react';
import { HsvaColor } from '../color-convert';
import { Interaction, Interactive } from './react-drag-event-interactive';

export type SaturationProps =
    & {
        hue: number;
        onChange?: (newColor: HsvaColor) => void;
    }
    & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

const containerStyle: CSSProperties = {
    // width: 400,
    // height: 200,
    position: 'relative',
};

export const Saturation = forwardRef<HTMLDivElement, SaturationProps>((props, ref) => {
    const {
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
            className="relative border-foreground border overflow-hidden"
            style={{
                // position: 'absolute',
                inset: 0,
                cursor: 'crosshair',
                backgroundImage: `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue}, 100%, 50%))`,
                ...containerStyle,
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
