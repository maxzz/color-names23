import { useState, useCallback } from "react";
import { Saturation } from "./color-saturation";
import { HsvaColor, hsvaToHex } from "./color-convert";
import { debounce } from "@/utils";

export function SaturationSelector() {
    const [hsvaColor, setHsvaColor] = useState<HsvaColor>({ h: 0, s: 0, v: 0, a: 1 } as HsvaColor);
    const [color, setColor] = useState<string>('');

    const onColorChange = useCallback(
        debounce((newColor: HsvaColor) => {
            console.log('newColor', newColor);
            setHsvaColor(newColor);
            setColor(hsvaToHex(newColor));
        }, 200), []
    );

    return (<>
        <Saturation
            hsva={hsvaColor}
            onChange={onColorChange}
        />

        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: color }}></div>
            <div className="">{color}</div>
        </div>
    </>);
}
