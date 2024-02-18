import { HTMLAttributes } from "react";
import { classNames } from "@/utils";
import { TopPanel } from "./01-top";
import { ThemeGrids } from "./02-grid";
import { PickerExample } from "@/components/ui/shadcn/gradient-color-picker";
import { CombinedPicker } from "@/components/ui/color-picker";
import { scrollbarGutterClasses } from "@/components/ui/shadcn";

export function Section4_Chadcn({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={classNames(`p-4 h-full text-foreground bg-background border-muted border-b smallscroll overflow-auto ${scrollbarGutterClasses} flex flex-col`, className)} {...rest}>
            <div className="my-4">
                <TopPanel />

                {/* <PickerExample /> */}
                
                {/* <CombinedPicker /> */}
            </div>

            <ThemeGrids />
        </div>
    );
}
