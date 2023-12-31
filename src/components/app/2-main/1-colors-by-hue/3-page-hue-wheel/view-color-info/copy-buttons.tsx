import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { ColorOverBackground } from "@/store";
import { colorToCopyState } from "@/components/ui/color-names-distribution";
import { HslName } from "@/utils";
import { IconCopy } from "@/components/ui/icons";

export const ringClasses = "ring-muted-foreground/40 ring-offset-background ring-1 ring-offset-1";

export function ButtonCopyBackground({ colorName, ...rest }: { colorName: string; } & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={"group text-sm flex hover:!text-white transition-colors items-center justify-between space-x-1.5"}
            {...rest}
            onClick={async () => {
                await navigator.clipboard.writeText(colorName);
                colorToCopyState.colorName = colorName;
            }}
        >
            <div>
                {colorName}
            </div>
            <IconCopy className="hidden group-hover:block w-[14px] h-[14px]" />
        </button>
    );
}

export function ButtonCopyBackgroundAndColor({ colorOverBackground, className, ...rest }: { colorOverBackground: ColorOverBackground; } & HTMLAttributes<HTMLButtonElement>) {
    const snap = useSnapshot(colorOverBackground);

    const f = (snap.colorClk?.split(',') as HslName)?.[3];
    const b = (snap.bkgClk?.split(',') as HslName)?.[3];

    const styles = f && b ? { color: f, backgroundColor: b } : undefined;
    const combined = `${b ? `background-color: ${b}` : ''}${b ? '; ' : ''}${f ? `color: ${f}` : ''}`;
    return (
        <button
            className={`group mt-2 px-2 py-1 min-h-[1.5rem] text-xs ${ringClasses} rounded active:scale-[.99] flex items-center space-x-2`}
            style={styles}
            disabled={!b && !f}
            onClick={async () => {
                await navigator.clipboard.writeText(combined);
                colorToCopyState.colorName = { simpleText: combined };
                //TODO: show copied message
            }}
            {...rest}
        >
            <span>
                {b && <>background-color: {b}</>}
                {b && <>; </>}
                {f && <>color: {f}</>}
            </span>

            <IconCopy className="w-4 h-4 hidden group-hover:block" />
        </button>
    );
}
