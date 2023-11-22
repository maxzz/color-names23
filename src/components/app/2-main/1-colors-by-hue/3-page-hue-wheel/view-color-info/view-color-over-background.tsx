import { HTMLAttributes } from "react";
import { useSnapshot } from "valtio";
import { ColorOverBackground } from "@/store";
import { HslName, classNames, isHslDark } from "@/utils";
import { CopyBackground, CopyBackgroundAndColor, ringClasses } from "./copy-buttons";

const containerClasses = `relative w-56 h-16 ${ringClasses} rounded grid place-items-center`;
const title = "Text color compared to background contrast. Contrast ratios can range from 1 to 21";

export function ViewColorOverBackground({ colorOverBackground, className, ...rest }: { colorOverBackground: ColorOverBackground; } & HTMLAttributes<HTMLDivElement>) {
    const snap = useSnapshot(colorOverBackground);

    const fgKeys = snap.color?.split(',') as HslName;
    const bgKeys = snap.background?.split(',') as HslName;

    const bgColorName = bgKeys?.[3] || '';
    const fgColorName = fgKeys?.[3] || '';

    const textColor = { color: bgKeys && isHslDark(bgKeys) ? '#ccc' : '#777' };
    return (
        <div className={className}>
            <div className={classNames(containerClasses)} style={{ backgroundColor: bgColorName }} title={title} {...rest}>
                {snap.background && snap.color && (
                    <div className="text-base scale-y-[1.1]" style={{ color: fgColorName }}>
                        {fgColorName}
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

            {/* <CopyBackgroundAndColor colorOverBackground={colorOverBackground} /> */}
        </div>
    );
}
