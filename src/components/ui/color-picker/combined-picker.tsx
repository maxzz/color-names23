import { useCallback } from "react";
import { Saturation } from "./color-saturation";
import { HsvaColor, hsvaToHex, hsvaToHexa } from "./color-convert";
import { PointerCircle } from "./color-saturation/pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";
import { Alpha, PointerCircleAlpha } from "./color-alpha";

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

function AlphaView() {
    const snap = useSnapshot(colorPickerState);
    const { h, s, v } = snap.hsvaColor;
    return (
        <Alpha className="w-80 h-8 border-foreground border" hsv={{ h, s, v }} onChange={(newAlpha) => {
            colorPickerState.hsvaColor.a = newAlpha;
            colorPickerState.hexaColor = hsvaToHexa(colorPickerState.hsvaColor);
        }}>
            <PointerCircleAlpha />
        </Alpha>
    );
}

// function AlphaView() {
//     const snap = useSnapshot(colorPickerState);
//     const { h, s, v } = snap.hsvaColor;
//     return (
//         <Alpha className="w-80 h-8 border-foreground border" hsv={{ h, s, v }} onChange={(newAlpha) => colorPickerState.hsvaColor.a = newAlpha}>
//             <PointerCircleAlpha />
//         </Alpha>
//     );
// }

export function SaturationSelector() {
    const snap = useSnapshot(colorPickerState);

    const onColorChange = useCallback(
        (newColor: HsvaColor) => {
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
        <div className="grid gap-y-2">
            <Saturation
                className="w-80 h-52 border-foreground border"
                hue={snap.hsvaColor.h}
                onChange={onColorChange}
            >
                <PointerCircle />
            </Saturation>

            <AlphaView />
        </div>

        <ColorNumbers />
    </>);
}
