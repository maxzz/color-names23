import { HTMLAttributes, forwardRef } from 'react';
import { HsvaColor } from '../color-convert';
import { Interaction, Interactive } from '../part-interactive';
import { classNames } from '@/utils';

export type SaturationProps =
    & {
        hue: number;
        onChange?: ({ s, v }: { s: number; v: number; }) => void;
    }
    & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>;

const bgGradient = (hue: number) => `linear-gradient(0deg, #000, transparent), linear-gradient(90deg, #fff, hsl(${hue}, 100%, 50%))`;

export const Saturation = forwardRef<HTMLDivElement, SaturationProps>((props, ref) => {
    const {
        hue,
        onChange,
        style,
        className,
        children,
        ...rest
    } = props;

    const handleChange = (interaction: Interaction, event: MouseEvent | TouchEvent) => {
        onChange?.({
            s: interaction.left * 100,
            v: (1 - interaction.top) * 100,
        });
    };

    return (
        <Interactive
            ref={ref}
            className={classNames("relative border-foreground border overflow-hidden cursor-crosshair", className)}
            style={{ backgroundImage: bgGradient(hue), ...style }}
            onMove={handleChange}
            onDown={handleChange}
            {...rest}
        >
            {children}
        </Interactive>
    );
});

Saturation.displayName = 'Saturation';
