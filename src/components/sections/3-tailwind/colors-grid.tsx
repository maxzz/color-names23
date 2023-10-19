import { Fragment } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { allColorsAtom, colorNameCntAtom, currentTwColorAtom } from "@/store";
import { GroupValues } from "@/components/ui/tailwind-colors-bridge";

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

export function TwColorsGrid() {
    const groupCnt = useAtomValue(colorNameCntAtom);
    const colors = useAtomValue(allColorsAtom);
    const groups = Object.entries(colors);
    return (
        <div className={`grid gap-0.5`} style={{gridTemplateColumns: `repeat(${groupCnt}, minmax(16px,46px)) auto`}}>
            {groups.map(([groupName, groupValues], idxRow) => (
                <Row groupName={groupName} groupValues={groupValues} key={idxRow} />
            ))}
        </div>
    );
}
