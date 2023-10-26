import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { classNames } from "@/utils";

export function ColorOverBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);
    //TODO: const dark = rgbLuminance(hslToRgb(keys)) <= 0.6 ? true : false;
    return (
        <div
            className={classNames("relative w-56 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center", className)}
            style={{ backgroundColor: snap.background }}
            {...rest}
        >
            {snap.background && snap.color && (
                <div
                    className=""
                    style={{ color: snap.color }}
                >
                    {snap.color}
                </div>
            )}
            <div className="absolute left-1 bottom-0.5 text-[.7rem]">
                {snap.background
                    ? <div className="">{snap.background}</div>
                    : <div className="text-muted-foreground">Ctrl+click spike to select background color</div>
                }
            </div>
        </div>
    );
}

