import { useRef } from "react";
import { useAtom } from "jotai";
import { viewHueAtoms } from "@/store";
import './hue-slider.scss';

export function HueSlider() {
    const [hue, setHue] = useAtom(viewHueAtoms.hueAtom);
    const sliderRef = useRef<HTMLInputElement>(null);
    return (
        <input
            className="w-full h-8 rounded hue-slider"
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
