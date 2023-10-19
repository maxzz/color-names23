import { HTMLAttributes } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { allColorsAtom, colorNameCntAtom, currentTwColorAtom } from '@/store';
import { isLightColor } from '@/utils-color';
import { classNames } from '@/utils';

const cellClasses = "relative pr-1 min-w-[2rem] h-16 cursor-pointer flex items-end justify-end";
const selectedColorClasses = "\
after:absolute \
after:left-0 \
after:-bottom-1.5 \
after:w-full \
after:h-1 \
after:bg-foreground/40 \
after:border-foreground \
after:border-t-4";

export function RowPalette({ groupName, className }: { groupName: string; } & HTMLAttributes<HTMLDivElement>) {
    const groupCnt = useAtomValue(colorNameCntAtom);
    const allColors = useAtomValue(allColorsAtom);
    const values = Object.entries(allColors[groupName]);
    const [currentTwColor, setCurrentTwColor] = useAtom(currentTwColorAtom);
    return (
        <div className={classNames("grid justify-end text-xs select-none", className)} style={{ gridTemplateColumns: `repeat(${groupCnt}, minmax(0,1fr))` }}>
            {values.map(([key, color], idx) => (
                <div
                    className={classNames(cellClasses, currentTwColor?.value === color && selectedColorClasses)}
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentTwColor((v) => v && { group: v.group, key, value: color })}
                    key={idx}
                >
                    <div className={`font-bold ${isLightColor(color) ? "text-black" : "text-white"}`}>
                        {key}
                    </div>
                </div>
            ))}
        </div>
    );
}
