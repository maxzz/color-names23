import { CSSProperties, Fragment } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { allColorsAtom, colorNameCntAtom, currentTwColorAtom } from "@/store";
import { GroupValues } from "@/components/ui/tailwind-colors-bridge";
import { CSS } from "@react-spring/web";

function Row({ groupName, groupValues }: { groupName: string; groupValues: GroupValues; }) {
    const values = Object.entries(groupValues);
    const setCurrentTwColor = useSetAtom(currentTwColorAtom);
    return (<>
        {values.map(([key, color], idx) => (
            <Fragment key={`${groupName}.${idx}`}>
                <button
                    className="p-1 h-6 border-foreground/40 dark:border-background/40 border rounded hover:scale-125 active:scale-[.97] transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setCurrentTwColor({ group: groupName, key, value: color, })}
                    title={`${groupName}: ${key}`}
                />
            </Fragment>
        ))}

        <div className="px-2 flex items-center text-foreground">{groupName}</div>
    </>);
}

function ColorsHeader({ paletteKeys }: { paletteKeys: string[]; }) {
    return (<>
        {paletteKeys.map((key, idx) => (
            <div key={idx} className="px-2 text-center text-foreground">{key}</div>
        ))}
        <div className=""></div>
    </>);
}

const gridTemplateColumnsClasses = (groupCnt: number) => ({ gridTemplateColumns: `repeat(${groupCnt}, minmax(16px,46px)) auto` } as CSSProperties);

export function TwColorsGrid() {
    const groupCnt = useAtomValue(colorNameCntAtom);
    const colors = useAtomValue(allColorsAtom);
    const groups = Object.entries(colors);
    if (!groups.length) {
        return null;
    }

    const paletteKeys = Object.keys(groups[0][1]); // [_groupName, groupValues] i.e. 50, 100, ..., 900, 950
    const gridStyle = gridTemplateColumnsClasses(groupCnt);

    return (
        <div className={`grid gap-0.5`} style={gridStyle}>
            <ColorsHeader paletteKeys={paletteKeys} />

            {groups.map(([groupName, groupValues], idxRow) => (
                <Row groupName={groupName} groupValues={groupValues} key={idxRow} />
            ))}

            <ColorsHeader paletteKeys={paletteKeys} />
        </div>
    );
}
