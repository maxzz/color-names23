import { INTERNAL_Snapshot, useSnapshot } from "valtio";
import { ThemeVarFB, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./4-grid-row";

type SplitItems = { idx: number; key: number | string; };

function splitColorAndLengths(vars: INTERNAL_Snapshot<ThemeVarFB[]>) {
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
    const { colors, lengths } = splitColorAndLengths(snap.vars);
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            {!!colors.length && (<>
                <HeaderColorValues />
                {colors.map(({ key, idx }) => (
                    <GridRow foreAndBack={theRightTheme.vars[idx]} key={key} />
                ))}
            </>)}

            {!!lengths.length && (<>
                <HeaderLengthValues />
                {lengths.map(({ key, idx }) => (
                    <GridRow foreAndBack={theRightTheme.vars[idx]} key={key} />
                ))}
            </>)}

        </div>
    );
}
