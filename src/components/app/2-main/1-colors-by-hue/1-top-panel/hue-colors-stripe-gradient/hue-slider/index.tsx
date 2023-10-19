import { HTMLAttributes, useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { viewHueAtoms } from "@/store";
import { classNames } from "@/utils";
import './hue-slider.scss';

export function HueSlider({ className, ...rest }: HTMLAttributes<HTMLInputElement>) {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom);
    const locked = useAtomValue(viewHueAtoms.lockedAtom);
    return (
        <input
            className={classNames(`hue-slider ${locked ? '[--locked:1]': '[--locked:0.2]'}`, className)}
            ref={sliderRef}
            type="range"
            min="0"
            max="359"
            value={hue}
            onChange={(event) => {
                const value = +event.target.value;
                sliderRef.current?.style.setProperty('--pos', `${value % 360}`);
                setHue(value);
            }}
            {...rest}
        />
    );
}
