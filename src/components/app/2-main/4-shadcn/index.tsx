import { HTMLAttributes, useCallback, useState } from "react";
import { classNames, debounce } from "@/utils";
import { TopPanel } from "./0-top-panel";
import { ThemeGrids } from "./6-grids";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";
import { HsvaColor, Saturation, hsvaToHex, hsvaToHexa, hsvaToHslaString, hsvaToRgbaString } from "@/components/ui/color-picker";

function SaturationSelector() {
    const [hsvaColor, setHsvaColor] = useState<HsvaColor>({ h: 0, s: 0, v: 0, a: 1 } as HsvaColor);
    const [color, setColor] = useState<string>('');
    
    const onColorChange = useCallback(debounce((newColor: HsvaColor) => {
        console.log('newColor', newColor);
        setHsvaColor(newColor);
        setColor(hsvaToHex(newColor));
    }, 200), []);
        
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

export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>
            <div className="my-4">
                <TopPanel />
                {/* <PickerExample /> */}
                <SaturationSelector />
            </div>

            <ThemeGrids />
        </div>
    );
}
