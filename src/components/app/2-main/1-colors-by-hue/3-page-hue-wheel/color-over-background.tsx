import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { classNames } from "@/utils";

export function ColorOverBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);
    // if (!snap.background) {
    //     return null;
    // }
    console.log('snap', snap);

    return (
        <div
            className={classNames("w-48 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center", className)}
            style={{ backgroundColor: snap.background }}
            {...rest}
        >
            {snap.color && (
                <div
                    className=""
                    style={{ color: snap.color }}
                >
                    {snap.color}
                </div>
            )}
        </div>
    );
}
//ctrl+click to select background color
