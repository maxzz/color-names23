import { HTMLAttributes, useCallback } from "react";
import { useSnapshot } from "valtio";
import { Saturation } from "./view-saturation";
import { Alpha } from "./view-alpha";
import { Hue } from "./view-hue";
import { PointerOverBox, PointerOverLine, checkerBoardImg } from "./part-pointer";
import { colorPickerState } from "./ui-state";
import { hsvaToHex, hsvaToHexa } from "./color-convert";
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
            className={classNames("w-full h-52 border-foreground border overflow-hidden cursor-crosshair", className)}
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
    const hexa = snap.hsvaColor.a === 1 ? hsvaToHex(snap.hsvaColor) : hsvaToHexa(snap.hsvaColor);
    return (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4" style={{ background: hexa }}></div>
            <div className="">{hexa}</div>
        </div>
    );
}

function ColorDisplay({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorPickerState);
    const hexa = snap.hsvaColor.a === 1 ? hsvaToHex(snap.hsvaColor) : hsvaToHexa(snap.hsvaColor);
    return (
        <div
            className={classNames("w-10 h-10 ring-muted-foreground/50 ring-1 rounded-full cursor-pointer active:scale-[.97]", className)}
            style={{ backgroundImage: `url(${checkerBoardImg})`, backgroundPosition: 'left center', backgroundColor: hexa, }}
            onClick={() => navigator.clipboard.writeText(hexa)}
            {...rest}
        />
    );
}

export function SaturationSelector() {
    return (<>
        <div className="w-56 inline-block bg-muted rounded">
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
        </div>

        <ColorNumbersDisplay />
    </>);
}
