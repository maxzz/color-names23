import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { classNames } from "@/utils";
import { HslName, isHslDark } from "@/components/ui/color-names-distribution";

const containerClasses = "relative w-56 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center";

function hslStringColor(str: string) {
    return str.split(',') as HslName;
}

export function ColorOverBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);

    //TODO: const dark = rgbLuminance(hslToRgb(keys)) <= 0.6 ? true : false;

    // const keys = selectedColor.dataKey.split(',') as HslName;
    // const name = keys[3];
    // const fill = isHslDark(keys) ? 'fill-white' : 'fill-black';

    //const fill = isHslDark(keys) ? 'fill-white' : 'fill-black';

    const keysBg = snap.background?.split(',') as HslName;
    const keysTxt = snap.color?.split(',') as HslName;

    const clrBg = keysBg && isHslDark(keysBg) ? 'fill-white' : 'fill-black';
    const clrTxt = keysTxt && isHslDark(keysTxt) ? 'fill-white' : 'fill-black';

    return (
        <div className={classNames(containerClasses, className)} style={{ backgroundColor: keysBg?.[3] }} {...rest}>
            {snap.background && snap.color && (
                <div
                    className="text-base scale-y-[1.2]"
                    style={{ color: keysTxt?.[3] }}
                >
                    {keysTxt?.[3]}
                </div>
            )}
            <div className="absolute left-1 bottom-0.5 text-[.7rem]">
                {snap.background
                    ? <div className="text-base scale-y-[1.2]" style={{color: isHslDark(keysBg) ? 'white':'black'}}>{keysBg?.[3]}</div>
                    : <div className="text-muted-foreground">Ctrl+click spike to select background color</div>
                }
            </div>
        </div>
    );
}
