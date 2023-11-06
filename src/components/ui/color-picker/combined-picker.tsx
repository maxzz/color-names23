import { HTMLAttributes, useCallback } from "react";
import { Saturation } from "./view-saturation";
import { hsvaToHex, hsvaToHexa } from "./color-convert";
import { PointerCircle } from "./part-pointer";
import { useSnapshot } from "valtio";
import { colorPickerState } from "./ui-state";
import { Alpha, PointerCircleAlpha } from "./view-alpha";
import { Hue } from "./view-hue";
import { classNames } from "@/utils";

function AlphaView({ className, ...rest }: Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
    const snap = useSnapshot(colorPickerState);
    const { h, s, v, a } = snap.hsvaColor;

    const onAlphaChange = useCallback(
        (a: number) => {
            if (colorPickerState.hsvaColor.a !== a) {
                colorPickerState.hsvaColor.a = a;
            }
        }, [snap.hsvaColor]
    );

    return (
        <Alpha
            className={classNames("w-56 h-6 border-foreground border", className)}
            hsv={{ h, s, v }}
            onChange={onAlphaChange}
            {...rest}
        >
            <PointerCircleAlpha value={a * 100} />
        </Alpha>
    );
}

function HueView({ className, ...rest }: Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
    const snap = useSnapshot(colorPickerState);
    const { h } = snap.hsvaColor;

    const onHueChange = useCallback(
        (h: number) => {
            if (colorPickerState.hsvaColor.h !== h) {
                colorPickerState.hsvaColor.h = h;
            }
        }, [snap.hsvaColor]
    );

    return (
        <Hue
            className={classNames("w-56 h-6 border-foreground border", className)}
            hue={h}
            onChange={onHueChange}
            {...rest}
        >
            <PointerCircleAlpha value={(h / 360) * 100} />
        </Hue>
    );
}

function SaturationView({ className, ...rest }: Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>) {
    const snap = useSnapshot(colorPickerState);

    const onSaturationValueChange = useCallback(
        ({ s, v }: { s: number; v: number; }) => {
            if (colorPickerState.hsvaColor.s !== s || colorPickerState.hsvaColor.v !== v) {
                colorPickerState.hsvaColor.v = v;
                colorPickerState.hsvaColor.s = s;
            }
        }, [snap.hsvaColor]
    );

    return (
        <Saturation
            className={classNames("w-56 h-52 border-foreground border", className)}
            hue={snap.hsvaColor.h}
            onChange={onSaturationValueChange}
            {...rest}
        >
            <PointerCircle />
        </Saturation>
    );
}

function ColorDisplay() {
    const snap = useSnapshot(colorPickerState);
    const hexa = hsvaToHex(snap.hsvaColor);
    return (
        <div className="w-8 h-8 rounded-full" style={{ background: hexa }}></div>
    );
}

function ColorNumbersDisplay() {
    const snap = useSnapshot(colorPickerState);
    const hexa = snap.hsvaColor.a === 1 ? hsvaToHex(snap.hsvaColor) : hsvaToHexa(snap.hsvaColor);
    return (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: hexa }}></div>
            <div className="">{hexa}</div>
        </div>
    );
}

export function SaturationSelector() {
    return (<>
        <div className="p-2 inline-block bg-muted">
            <div className="grid grid-cols-2 gap-y-1">
                <SaturationView />

                <ColorDisplay />

                <div className="grid gap-y-1">
                    <HueView />
                    <AlphaView />
                </div>
            </div>
        </div>

        <ColorNumbersDisplay />
    </>);
}
