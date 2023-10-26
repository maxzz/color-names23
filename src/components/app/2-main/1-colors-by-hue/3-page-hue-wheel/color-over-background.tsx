import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { HslName, classNames, isHslDark } from "@/utils";

const containerClasses = "relative w-56 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center";

export function ColorOverBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);
    const keysBg = snap.background?.split(',') as HslName;
    const keysTxt = snap.color?.split(',') as HslName;
    return (
        <div className={classNames(containerClasses, className)} style={{ backgroundColor: keysBg?.[3] }} {...rest}>

            {snap.background && snap.color && (
                <div className="text-base scale-y-[1.2]" style={{ color: keysTxt?.[3] }}>
                    {keysTxt?.[3]}
                </div>
            )}

            <div className="absolute left-1 bottom-0.5">
                {snap.background
                    ? <div className="text-base scale-y-[1.2]" style={{color: isHslDark(keysBg) ? 'white':'black'}}>{keysBg?.[3]}</div>
                    : <div className="text-[.7rem] text-muted-foreground">Ctrl+click spike to select background color</div>
                }
            </div>

            {/* TDOD: Calc luminance text over background */}
            {/* <div className="absolute right-1 bottom-0.5">
                {
                    <div className="text-base scale-y-[1.2]" style={{color: 'black'}}>{}</div>
                }
            </div> */}
        </div>
    );
}
