import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { ColorOverBackground } from "@/store";
import { colorToCopyState } from "@/components/ui/color-names-distribution";
import { HslName, classNames, isHslDark } from "@/utils";
import { IconClipboard } from "@/components/ui/icons";

function CopyBackground({ colorName, ...rest }: { colorName: string; } & HTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className={"group text-sm flex hover:!text-white transition-colors items-center justify-between space-x-0.5"}
            {...rest}
            onClick={async () => {
                await navigator.clipboard.writeText(colorName);
                colorToCopyState.text = colorName;
            }}
        >
            <div className="">{colorName}</div>
            <IconClipboard className="hidden group-hover:block w-4 h-4 stroke-[1.5]" />
        </button>
    );
}

const containerClasses = "relative w-56 h-16 ring-muted-foreground/50 ring-offset-background ring-1 ring-offset-1 rounded grid place-items-center";
const title = "Text color compared to background contrast. Contrast ratios can range from 1 to 21";

export function ViewColorOverBackground({ colorOverBackground, className, ...rest }: { colorOverBackground: ColorOverBackground; } & HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);
    const keysTxt = snap.color?.split(',') as HslName;
    const keysBg = snap.background?.split(',') as HslName;
    const bgColorName = keysBg?.[3] || '';
    const textColor = {color: keysBg && isHslDark(keysBg) ? '#ccc' : '#777'};
    return (
        <div className={classNames(containerClasses, className)} style={{ backgroundColor: bgColorName }} title={title} {...rest}>

            {snap.background && snap.color && (
                <div className="text-base scale-y-[1.1]" style={{ color: keysTxt?.[3] }}>
                    {keysTxt?.[3]}
                </div>
            )}

            <div className="absolute left-1 bottom-0.5">
                {snap.background
                    ? <CopyBackground colorName={bgColorName} style={textColor} />
                    : <div className="text-[.7rem] text-muted-foreground">Ctrl+click spike to select background color</div>
                }
            </div>

            <div className="absolute right-1 bottom-0.5">
                {colorOverBackground.contrast &&
                    <div className="text-[.7rem]" style={textColor}>
                        {colorOverBackground.contrast}
                    </div>
                }
            </div>
        </div>
    );
}
