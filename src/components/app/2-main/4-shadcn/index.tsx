import { HTMLAttributes, useState } from "react";
import { classNames } from "@/utils";
import { TopPanel } from "./0-top-panel";
import { ThemeGrids } from "./6-grids";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";
import { Saturation } from "@/components/ui/color-picker";
import { HsvaColor } from "@/components/ui/color-picker/color-conver";

function SaturationSelector() {
    const [color, setColor] = useState<HsvaColor>({ h: 0, s: 0, v: 0, a: 1 } as HsvaColor);
    return (
        <Saturation
                    hsva={color}
                    onChange={(newColor: HsvaColor) => {
                        console.log('newColor', newColor);
                        setColor(newColor);
                    }} />
    );
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
