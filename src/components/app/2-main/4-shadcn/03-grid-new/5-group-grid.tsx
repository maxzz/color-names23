import { INTERNAL_Snapshot, useSnapshot } from "valtio";
import { VarFBRU, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-grid-headers";
import { GridRow } from "./4-grid-row";

type SplitItems = { idx: number; key: number | string; };

function splitColorAndLengths(vars: INTERNAL_Snapshot<VarFBRU[]>) {
    return vars.reduce(
        (acc, curr, idx) => {
            const isColor = curr.b?.isHsl || curr.f?.isHsl;
            acc[isColor ? 'colors' : 'lengths'].push({
                idx,
                key: curr.b?.id || curr.f?.id || `${isColor ? 'color' : 'length'}-${idx}}`,
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
    const { colors, lengths } = splitColorAndLengths(snap.vars.flat());

    const theRightThemeFlat = theRightTheme.vars.flat();

    return (<>
        {!!colors.length && (<>
            <HeaderColorValues />
            {colors.map(({ key, idx }) => (
                <GridRow varFBRU={theRightThemeFlat[idx]} key={key} />
            ))}
        </>)}

        {!!lengths.length && (<>
            <HeaderLengthValues />
            {lengths.map(({ key, idx }) => (
                <GridRow varFBRU={theRightThemeFlat[idx]} key={key} />
            ))}
        </>)}
    </>);
}
