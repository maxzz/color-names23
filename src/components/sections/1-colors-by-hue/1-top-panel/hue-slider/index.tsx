import { useRef } from "react";
import { useAtom, useAtomValue } from "jotai";
import { viewHueAtoms } from "@/store";
import './hue-slider.scss';

export function HueSlider() {
    const sliderRef = useRef<HTMLInputElement>(null);
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom);
    const locked = useAtomValue(viewHueAtoms.lockedAtom);
    return (
        <input
            className={`w-full h-8 rounded hue-slider ${locked ? '[--locked:1]': '[--locked:0.2]'}`}
            ref={sliderRef}
            type="range"
            min="0"
            max="359"
            value={hue}
            onChange={(event) => {
                const v = +event.target.value;
                sliderRef.current?.style.setProperty('--pos', `${v % 360}`);
                setHue(v);
            }}
        />
    );
}
