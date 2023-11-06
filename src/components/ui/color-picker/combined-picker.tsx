import { useCallback } from "react";
import { Saturation } from "./view-saturation";
import { HsvaColor, hsvaToHex, hsvaToHexa } from "./color-convert";
import { PointerCircle } from "./part-pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";
import { Alpha, PointerCircleAlpha } from "./view-alpha";
import { Hue } from "./view-hue";

function ColorNumbersDisplay() {
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
    const { h, s, v, a } = snap.hsvaColor;

    const onAlphaChange = useCallback(
        (newAlpha: number) => {
            const { h, s, v } = colorPickerState.hsvaColor;
            const newColor: HsvaColor = { h, s, v, a: newAlpha };
            const hexaNew = hsvaToHexa(newColor);
            if (colorPickerState.hexaColor === hexaNew) {
                return;
            }
            colorPickerState.hsvaColor = newColor;
            colorPickerState.hexaColor = hexaNew;
        }, [snap.hsvaColor]
    );

    return (
        <Alpha
            className="w-80 h-8 border-foreground border"
            hsv={{ h, s, v }}
            onChange={onAlphaChange}
        >
            <PointerCircleAlpha value={a} />
        </Alpha>
    );
}

function HueView() {
    const snap = useSnapshot(colorPickerState);
    const { h } = snap.hsvaColor;

    const onHueChange = useCallback(
        (newHue: number) => {
            if (colorPickerState.hsvaColor.h === newHue) {
                console.log('hexaNew', colorPickerState.hsvaColor);
                return;
            }
            colorPickerState.hsvaColor.h = newHue;
            const hexaNew = hsvaToHexa(colorPickerState.hsvaColor);
            colorPickerState.hexaColor = hexaNew;
            //console.log('newColor', hexaNew, colorPickerState.hsvaColor);
        }, [snap.hsvaColor]
    );

    return (
        <Hue
            className="w-80 h-8 border-foreground border"
            hue={h}
            onChange={onHueChange}
        >
            <PointerCircleAlpha value={h} />
        </Hue>
    );
}

function SaturationView() {
    const snap = useSnapshot(colorPickerState);

    const onSaturationValueChange = useCallback(
        (newColor: HsvaColor) => {
            const hexaNew = hsvaToHexa(newColor);
            if (colorPickerState.hexaColor === hexaNew) {
                return;
            }
            colorPickerState.hsvaColor = newColor;
            colorPickerState.hexaColor = hexaNew;
        }, [snap.hsvaColor]
    );
    return (
        <Saturation
            className="w-80 h-52 border-foreground border"
            hue={snap.hsvaColor.h}
            onChange={onSaturationValueChange}
        >
            <PointerCircle />
        </Saturation>
    );
}

export function SaturationSelector() {
    return (<>
        <div className="grid gap-y-2">
            <SaturationView />
            <HueView />
            <AlphaView />
        </div>

        <ColorNumbersDisplay />
    </>);
}
