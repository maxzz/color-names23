import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { TopPanel } from "./01-top/0-top-panel";
import { ThemeGrids } from "./02-grid/6-grids";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";
import { SaturationSelector } from "@/components/ui/color-picker";

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
