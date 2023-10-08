import { HTMLAttributes } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import useMeasure from 'react-use-measure';
import { allColorsAtom, colorNameCntAtom, CurrentTwColor, currentTwColorAtom } from '@/store';
import { CopyColorButton } from '@/components/ui/copy-color-button';
import { isLightColor } from '@/utils-color';
import { classNames } from '@/utils';

function PreviewBox() {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    const txtColor = { color: currentTwColor ? isLightColor(currentTwColor.value) ? 'black' : 'white' : '' };
    return (
        <div
            className="flex-none w-24 h-16 text-xs border-primary-400 border rounded flex transition-colors"
            style={{ backgroundColor: currentTwColor?.value || 'transparent' }}
        >
            {currentTwColor &&
                <div className="flex-1 px-1.5 py-0.5 flex items-end justify-between">
                    <div className="transition-colors" style={txtColor}>
                        {currentTwColor.group}
                    </div>
                    <div className="transition-colors" style={txtColor}>
                        {currentTwColor.key}
                    </div>
                </div>
            }
        </div>
    );
}

function SelectedColorValue({ currentTwColor }: { currentTwColor: CurrentTwColor | null; }) {
    //TODO: show color value in hex, rgb, hsl
    return (<>
        {currentTwColor && (
            <CopyColorButton valueToCopy={currentTwColor.value.toUpperCase()} />
        )}
    </>);
}

function RowPalette({ groupName, className }: { groupName: string; } & HTMLAttributes<HTMLDivElement>) {
    const groupCnt = useAtomValue(colorNameCntAtom);
    const allColors = useAtomValue(allColorsAtom);
    const values = Object.entries(allColors[groupName]);
    const [currentTwColor, setCurrentTwColor] = useAtom(currentTwColorAtom);
    return (
        <div className={classNames("grid justify-end text-xs select-none", className)} style={{ gridTemplateColumns: `repeat(${groupCnt}, minmax(0,1fr))` }}>
            {values.map(([key, color], idx) => (
                <div
                    className={classNames(
                        "relative pr-1 min-w-[2rem] h-16 cursor-pointer flex items-end justify-end",
                        currentTwColor?.value === color &&
                        "after:absolute after:left-0 after:-bottom-1.5 after:w-full after:h-1 after:bg-slate-400/40 after:border-slate-400 after:border-t",
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentTwColor((v) => v && { group: v.group, key, value: color })}
                    key={idx}
                >
                    <div style={{ color: isLightColor(color) ? "black" : "white" }}>{key}</div>
                </div>
            ))}
        </div>
    );
}

export function TwColorInfoContainer({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
    const currentTwColor = useAtomValue(currentTwColorAtom);
    const [ref, { width: containerWidth }] = useMeasure();
    return (
        <div ref={ref} className={classNames("px-4 py-2", className)} {...rest}>

            {/* Palette name */}
            <div className="flex items-center justify-end text-center">
                {currentTwColor
                    ?
                    <div className="flex items-center text-sm tracking-tighter uppercase">
                        {currentTwColor.group}
                    </div>
                    : "Pick a color from the grid"
                }
            </div>

            {/* Low container */}
            <div className="flex items-start justify-between space-x-4 text-sm">

                {/* Preview and color value */}
                <div className={classNames("flex", containerWidth < 700 ? "flex-col space-x-0" : "flex-row space-x-2")}>
                    <PreviewBox />
                    <SelectedColorValue currentTwColor={currentTwColor} />
                </div>

                {/* Row */}
                <div className="flex-1 max-w-[400px]">
                    {currentTwColor &&
                        <RowPalette groupName={currentTwColor.group} />
                    }
                </div>
            </div>

        </div>
    );
}
