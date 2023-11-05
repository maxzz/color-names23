import { useCallback } from "react";
import { Saturation } from "./color-saturation";
import { HsvaColor, hsvaToHex } from "./color-convert";
import { debounce } from "@/utils";
import { PointerCircle } from "./color-saturation/pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";

function ColorNumbers() {
    const snap = useSnapshot(colorPickerState);
    const color = hsvaToHex(snap.hsvaColor);
    return (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: color }}></div>
            <div className="">{color}</div>
        </div>
    );
}

export function SaturationSelector() {
    const snap = useSnapshot(colorPickerState);

    // const onColorChange = useCallback(
    //     debounce((newColor: HsvaColor) => {
    //         console.log('newColor', newColor);
    //         colorPickerState.hsvaColor = newColor;
    //     }, 50), []
    // );
    const onColorChange = useCallback((newColor: HsvaColor) => {
        const hexCurrent = hsvaToHex(snap.hsvaColor);
        const hexNew = hsvaToHex(newColor);
        console.log('compare', hexCurrent, hexNew);
        if (hexCurrent === hexNew) {
            console.log('the same', hexCurrent, hexNew);
            
            return;
        }

        console.log('newColor', hsvaToHex(newColor), newColor);
        colorPickerState.hsvaColor = newColor;
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
