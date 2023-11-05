import { useCallback } from "react";
import { Saturation } from "./color-saturation";
import { HsvaColor, hsvaToHex, hsvaToHexa } from "./color-convert";
import { PointerCircle } from "./color-saturation/pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";

function ColorNumbers() {
    const snap = useSnapshot(colorPickerState);
    const hexa = snap.hexaColor; //TODO: don't show alpha if it's 1
    return (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: hexa }}></div>
            <div className="">{hexa}</div>
        </div>
    );
}

export function SaturationSelector() {
    const snap = useSnapshot(colorPickerState);

    const onColorChange = useCallback((newColor: HsvaColor) => {
        const hexaNew = hsvaToHexa(newColor);
        if (colorPickerState.hexaColor === hexaNew) {
            return;
        }
        colorPickerState.hsvaColor = newColor;
        colorPickerState.hexaColor = hexaNew;
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
