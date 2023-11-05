import { useCallback } from "react";
import { Saturation } from "./color-saturation";
import { HsvaColor, hsvaToHex } from "./color-convert";
import { PointerCircle } from "./color-saturation/pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";

function ColorNumbers() {
    const snap = useSnapshot(colorPickerState);
    const color = snap.hexColor;
    return (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: color }}></div>
            <div className="">{color}</div>
        </div>
    );
}

export function SaturationSelector() {
    const snap = useSnapshot(colorPickerState);

    const onColorChange = useCallback((newColor: HsvaColor) => {
        const hexNew = hsvaToHex(newColor);
        if (colorPickerState.hexColor === hexNew) {
            return;
        }
        colorPickerState.hsvaColor = newColor;
        colorPickerState.hexColor = hexNew;
    }, [snap.hsvaColor]
    );

    console.log('SaturationSelector re-render');

    return (<>
        <Saturation
            hue={snap.hsvaColor.h}
            onChange={onColorChange}
        >
            <PointerCircle />
        </Saturation>

        <ColorNumbers />
    </>);
}
