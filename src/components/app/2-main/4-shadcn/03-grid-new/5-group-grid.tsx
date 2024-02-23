import { INTERNAL_Snapshot, useSnapshot } from "valtio";
import { Fbru, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-grid-headers";
import { GridRow } from "./4-grid-row";

type SplitItems = { idx: number; key: number | string; };

function splitColorsAndLengths(vars: INTERNAL_Snapshot<Fbru[]>) {
    return vars.reduce(
        (acc, curr, idx) => {
            const isColor = curr.some((v) => v?.isHsl);
            const key = curr.find((v) => v?.id)?.id || `${isColor ? 'color' : 'length'}-${idx}`;
            acc[isColor ? 'colors' : 'lengths'].push({
                idx,
                key,
            });
            return acc;
        },
        {
            colors: [] as SplitItems[],
            lengths: [] as SplitItems[],
        }
    );
}

export function GroupGrid({ idx }: { idx: number; }) {
    const snap = useSnapshot(shadcnAll.themes)[idx];
    const theRightTheme = shadcnAll.themes[idx];
    const { colors, lengths } = splitColorsAndLengths(snap.vars);
    return (<>
        {!!colors.length && (<>
            <HeaderColorValues />
            {colors.map(({ key, idx }) => (
                <GridRow varFBRU={theRightTheme.vars[idx]} key={key} />
            ))}
        </>)}

        {!!lengths.length && (<>
            <HeaderLengthValues />
            {lengths.map(({ key, idx }) => (
                <GridRow varFBRU={theRightTheme.vars[idx]} key={key} />
            ))}
        </>)}
    </>);
}
