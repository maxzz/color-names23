import { useCallback } from "react";
import { Saturation } from "./view-saturation";
import { hsvaToHex, hsvaToHexa } from "./color-convert";
import { PointerCircle } from "./part-pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";
import { Alpha, PointerCircleAlpha } from "./view-alpha";
import { Hue } from "./view-hue";

function ColorNumbersDisplay() {
    const snap = useSnapshot(colorPickerState);
    const hexa = snap.hsvaColor.a === 1 ? hsvaToHex(snap.hsvaColor): hsvaToHexa(snap.hsvaColor);
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
            if (colorPickerState.hsvaColor.a === newAlpha) {
                return;
            }
            colorPickerState.hsvaColor.a = newAlpha;
        }, [snap.hsvaColor]
    );

    return (
        <Alpha
            className="w-80 h-8 border-foreground border"
            hsv={{ h, s, v }}
            onChange={onAlphaChange}
        >
            <PointerCircleAlpha value={a * 100} />
        </Alpha>
    );
}

function HueView() {
    const snap = useSnapshot(colorPickerState);
    const { h } = snap.hsvaColor;

    const onHueChange = useCallback(
        (newHue: number) => {
            if (colorPickerState.hsvaColor.h === newHue) {
                return;
            }
            colorPickerState.hsvaColor.h = newHue;
        }, [snap.hsvaColor]
    );

    return (
        <Hue
            className="w-80 h-8 border-foreground border"
            hue={h}
            onChange={onHueChange}
        >
            <PointerCircleAlpha value={(h / 360) * 100} />
        </Hue>
    );
}

function SaturationView() {
    const snap = useSnapshot(colorPickerState);

    const onSaturationValueChange = useCallback(
        ({ s, v }: { s: number; v: number; }) => {
            if (colorPickerState.hsvaColor.s === s && colorPickerState.hsvaColor.v === v) {
                return;
            }
            colorPickerState.hsvaColor.v = v;
            colorPickerState.hsvaColor.s = s;
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
