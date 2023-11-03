import { Fragment } from "react";
import { useSnapshot } from "valtio";
import { ThemeVarFB, ThemeVars, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./4-grid-row";

export function strThemeVarFB(tv: ThemeVarFB) {
    return `f: ${tv.f ? JSON.stringify(tv.f) : ''}\nb: ${tv.b ? JSON.stringify(tv.b) : ''}`;
}

export function strThemeVarFBArr(tv: ThemeVarFB[]) {
    return tv.map((v) => strThemeVarFB(v)).join('\n\n');
}

export function strThemeVars(tv: any) {
    return JSON.stringify({
        ...tv,
        vars: tv.vars.map((v: any) => strThemeVarFB(v))
    }, null, 4);
}

export function strThemesVars(tv?: any[]) {
    return (tv || []).map((v) => strThemeVars(v)).join('\n');
}

export function GroupGrid({ themeVars, idx }: { themeVars: ThemeVars; idx: number; }) {
    const snapThemes = useSnapshot(shadcnAll.themes);
    const snap = snapThemes[idx];
    //console.log(`---1 store store themeVars.vars = \n${strThemeVarFBArr(themeVars.vars)}`);
    // console.log(`---2 snapThemes`, JSON.stringify(snapThemes, null, 4));
    console.log(`---3 snap[${idx}]`, strThemeVars(snap));
    if (!snap) {
        return null;
    }


    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

            {snap.vars.length && (<>
                <HeaderColorValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}`}>
                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}

                <HeaderLengthValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}-length`}>
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
                    </Fragment>
                ))}
            </>)}

        </div>
    );
    // return (
    //     <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">

    //         {snap.vars.length && (<>
    //             <HeaderColorValues />
    //             {snap.vars.map((foreAndBack, idx) => (
    //                 <Fragment key={`${idx}`}>
    //                     {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
    //                 </Fragment>
    //             ))}

    //             <HeaderLengthValues />
    //             {snap.vars.map((foreAndBack, idx) => (
    //                 <Fragment key={`${idx}-length`}>
    //                     {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) && <GridRow foreAndBack={themeVars.vars[idx]} />}
    //                 </Fragment>
    //             ))}
    //         </>)}

    //     </div>
    // );
}

