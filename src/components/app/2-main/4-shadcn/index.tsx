import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { shadcnAll } from "@/store";
import { classNames } from "@/utils";
import { TopPanel } from "./0-top-panel";
import { GroupGrid } from "./5-group-grid";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";
import { ThemeGrids } from "./6-grids";

export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames("p-4 h-full text-foreground bg-background border-muted border-b overflow-auto smallscroll flex flex-col", className)} {...rest}>
            <div className="my-4">
                <TopPanel />
                {/* <PickerExample /> */}
            </div>

            <ThemeGrids />
        </div>
    );
}
