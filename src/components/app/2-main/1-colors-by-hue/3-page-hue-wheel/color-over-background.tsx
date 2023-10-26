import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { colorOverBackground } from "@/store";
import { colorToCopyState } from "@/components/ui/color-names-distribution";
import { HslName, classNames, isHslDark } from "@/utils";
import { IconClipboard } from "@/components/ui/icons";

const textClasses = "text-base scale-y-[1.1]";

function CopyBackground({ colorName, isDark }: { colorName: string; isDark: boolean; }) {
    return (
        <button
            className={classNames("group flex items-center justify-between space-x-1", textClasses)}
            style={{ color: isDark ? 'white' : 'black' }}
            onClick={async () => {
                await navigator.clipboard.writeText(colorName);
                colorToCopyState.text = colorName;
            }}
        >
            <div>{colorName}</div>
            <IconClipboard className="hidden group-hover:block w-4 h-4 stroke-[1.5]" />
        </button>
    );
}

const containerClasses = "relative w-56 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center";

export function ColorOverBackground({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);
    const keysTxt = snap.color?.split(',') as HslName;
    const keysBg = snap.background?.split(',') as HslName;
    const colorBg = keysBg?.[3] || '';
    return (
        <div className={classNames(containerClasses, className)} style={{ backgroundColor: colorBg }} {...rest}>

            {snap.background && snap.color && (
                <div className={textClasses} style={{ color: keysTxt?.[3] }}>
                    {keysTxt?.[3]}
                </div>
            )}

            <div className="absolute left-1.5 bottom-1">
                {snap.background
                    ? <CopyBackground colorName={colorBg} isDark={isHslDark(keysBg)} />
                    : <div className="text-[.7rem] text-muted-foreground">Ctrl+click spike to select background color</div>
                }
            </div>

            {/* TDOD: Calc luminance text over background */}
            {/* <div className="absolute right-1 bottom-0.5">
                {
                    <div className={textClasses} style={{color: 'black'}}>{}</div>
                }
            </div> */}
        </div>
    );
}
