import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { ThemeVar, ThemeVarFB, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./4-grid-row";

type ThemeVarFBGroup = { idx: number; key: number; themeVar: ThemeVarFB; };

function splitColorAndLengths(vars: ThemeVarFB[]) {
    return vars.reduce(
        (acc, curr, idx) => {
            const key = curr.b?.id || curr.f?.id || idx;
            if (curr.b?.isHsl || curr.f?.isHsl) {
                acc.colors.push({ idx, key, themeVar: curr });
            } else {
                acc.lengths.push({ idx, key, themeVar: curr });
            }
            return acc;
        },
        {
            colors: [] as ThemeVarFBGroup[],
            lengths: [] as ThemeVarFBGroup[],
        }
    );
}

export function GroupGrid({ idx }: { idx: number; }) {
    const snap = useSnapshot(shadcnAll.themes)[idx];
    const theRightTheme = shadcnAll.themes[idx];
    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
            {/* version w/ keys */}
            {snap.vars.length && (<>

                <HeaderColorValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) &&
                            <GridRow foreAndBack={theRightTheme.vars[idx]} />
                        }
                    </Fragment>
                ))}

                <HeaderLengthValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) &&
                            <GridRow foreAndBack={theRightTheme.vars[idx]} />
                        }
                    </Fragment>
                ))}
            </>)}

        </div>
    );
}
