import { HTMLAttributes, useCallback } from "react";
import { useSnapshot } from "valtio";
import { Saturation } from "./view-saturation";
import { Alpha } from "./view-alpha";
import { Hue } from "./view-hue";
import { PointerOverBox, PointerOverLine, checkerBoardBkg } from "./part-pointer";
import { colorPickerState } from "./ui-state";
import { hsvaToHex, hsvaToHexa } from "./color-convert";
import { classNames } from "@/utils";
import { ColorInputs } from "./part-inputs";

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
            className={classNames("w-full h-5 border-foreground border", className)}
            hsv={{ h, s, v }}
            onChange={onAlphaChange}
            {...rest}
        >
            <PointerOverLine value={a * 100} />
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
            className={classNames("w-full h-5 border-foreground border", className)}
            hue={h}
            onChange={onHueChange}
            {...rest}
        >
            <PointerOverLine value={(h / 360) * 100} />
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
            className={classNames("w-full h-[127px] overflow-hidden cursor-crosshair", className)}
            hue={snap.hsvaColor.h}
            onChange={onSaturationValueChange}
            {...rest}
        >
            <PointerOverBox />
        </Saturation>
    );
}

function ColorNumbersDisplay() {
    const snap = useSnapshot(colorPickerState);
    const hexa = hsvaToHexa(snap.hsvaColor);
    const hexaTxt = snap.hsvaColor.a === 1 ? hsvaToHex(snap.hsvaColor) : hexa;
    return (
        <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6 overflow-hidden" style={{ background: checkerBoardBkg }}>
                <div className="absolute inset-0 z-10" style={{ background: hexa, }}></div>
            </div>
            <div className="">{hexaTxt}</div>
        </div>
    );
}

function ColorDisplay({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorPickerState);
    const hexa = hsvaToHexa(snap.hsvaColor);
    return (
        <div
            className={classNames("relative w-10 h-10 ring-muted-foreground/50 ring-1 rounded-full overflow-hidden cursor-pointer active:scale-[.97]", className)}
            style={{ background: checkerBoardBkg }}
            onClick={() => navigator.clipboard.writeText(hexa)}
            {...rest}
        >
            <div className="absolute inset-0 z-10" style={{ background: hexa, }}></div>
        </div>
    );
}

export function SaturationSelector() {
    return (<>
        <div className="w-[232px] inline-block bg-muted border-foreground border rounded overflow-hidden">
            <div className="grid grid-cols-[auto,1fr] gap-y-1">
                <SaturationView className="col-span-2" />

                <div className="p-2 grid place-items-center">
                    <ColorDisplay />
                </div>

                <div className="pl-4 pr-6 grid">
                    <HueView />
                    <AlphaView />
                </div>
            </div>

            <ColorInputs />
        </div>

        <ColorNumbersDisplay />
    </>);
}
