import { CSSProperties, HTMLAttributes, forwardRef } from 'react';
import { HsvColor, hsvaToHslaString } from '../color-convert';
import { checkerBoardImg } from '../part-pointer';
import { Interaction, Interactive } from '../part-interactive';

export interface AlphaProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    hsv: HsvColor;
    onChange?: (newAlpha: number, offset: Interaction) => void;
    background?: string;
    isVertical?: boolean;
}

export const alphaBackgroundGradient = (isVertical: boolean | undefined, colorTo: string) => `linear-gradient(to ${isVertical ? 'bottom' : 'right'}, rgba(244, 67, 54, 0) 0%, ${colorTo} 100%)`;

export const Alpha = forwardRef<HTMLDivElement, AlphaProps>((props, ref) => {
    const { hsv, onChange, children, background, isVertical, style, ...rest } = props;

    const colorTo = hsvaToHslaString({ ...hsv, a: 1 });

    const styleWrapper = {
        position: 'relative',
        '--alpha-background-color': '#fff',
        '--alpha-pointer-background-color': '#f8f8f8',
        '--alpha-pointer-box-shadow': 'rgb(0 0 0 / 37%) 0px 1px 4px 0px',
        background: `url(${checkerBoardImg}) left center var(--alpha-background-color)`,
        ...style,
    } as CSSProperties;

    function handleChange(offset: Interaction) {
        onChange?.(isVertical ? offset.top : offset.left, offset);
    }

    return (
        <div ref={ref} style={styleWrapper} {...rest}>
            <div
                style={{
                    inset: 0,
                    position: 'absolute',
                    background: background || alphaBackgroundGradient(isVertical, colorTo),
                    // borderRadius: radius,
                    // ...bgProps.style,
                }}
            // {...bgProps}
            />

            <Interactive
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 1,
                    // ...innerProps.style,
                }}
                onMove={handleChange}
                onDown={handleChange}
            // {...innerProps}
            >
                {children}
            </Interactive>
        </div>
    );
});

Alpha.displayName = 'Alpha';
