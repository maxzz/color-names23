import { Fragment } from "react";
import { INTERNAL_Snapshot, useSnapshot } from "valtio";
import { ThemeVarFB, ThemeVars, shadcnAll } from "@/store";
import { HeaderColorValues, HeaderLengthValues } from "./1-headers";
import { GridRow } from "./4-grid-row";

function strStringify(obj: object) {
    return Object.entries(obj)
        .map(([key, value]) => {
            if (typeof value === 'string') {
                value = `'${value}`;
            }
            return [key, value];
        })
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
}

export function strThemeVarFB(tv: ThemeVarFB) {
    const f = tv.f ? `f: {${strStringify(tv.f)}}` : '';
    const b = tv.b ? `b: {${strStringify(tv.b)}}` : '';
    const rv = [f, b].filter((v) => v).join(',\n    ');
    return `{\n    ${rv}\n}`;
}

export function strThemeVarFBArr(tv: ThemeVarFB[]) {
    return tv.map((v) => strThemeVarFB(v))
        .join(',\n')
        .replaceAll(/},\r?\n\s*{/g, '    }, {');
}

export function strThemeVars(tv: INTERNAL_Snapshot<ThemeVars>) {
    return JSON.stringify({
        ...tv,
        vars: tv.vars.map((v) => ({
            ...(v.f && { f: strStringify(v.f) }),
            ...(v.b && { b: strStringify(v.b) }),
        }))
    }, null, 4)
        .replaceAll(/},\r?\n\s*{/g, '}, {')
        .replaceAll(/\[\r?\n\s*{/g, '[ {');
}

export function strThemesVars(tv?: INTERNAL_Snapshot<ThemeVars[]>) {
    if (!tv?.length) {
        return '[]';
    }
    return (tv || []).map((v) => strThemeVars(v)).join('\n');
}

export function GroupGrid({ themeVars, idx }: { themeVars: ThemeVars; idx: number; }) {
    const snapThemes = useSnapshot(shadcnAll.themes);
    const snap = snapThemes[idx];
    // console.log(`%c---1 store store themeVars.vars = ${strThemeVarFBArr(themeVars.vars)}`, 'background: navy; color:ghostwhite');
    // console.log(`---2 snapThemes`, JSON.stringify(snapThemes, null, 4));
    // console.log(`---3 snap[${idx}]`, strThemeVars(snap));

    console.log(`%c---1 store store themeVars.vars = ${strThemesVars(shadcnAll.themes)}`, 'background: navy; color:ghostwhite');
    console.log(`---3 snapThemes`, strThemesVars(snapThemes));
    if (!snap) {
        return null;
    }


    return (
        <div className="container mx-auto max-w-xl grid grid-cols-[min-content,minmax(0,12rem),minmax(0,12rem)] place-content-center gap-y-2">
            {/* version w/ keys */}
            {snap.vars.length && (<>
                <HeaderColorValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}`}>
                        {console.log({foreAndBack, idx}) as any as boolean || null}

                        {(foreAndBack.b?.isHsl || foreAndBack.f?.isHsl) &&
                            <GridRow foreAndBack={themeVars.vars[idx]} />
                        }
                    </Fragment>
                ))}

                <HeaderLengthValues />
                {snap.vars.map((foreAndBack, idx) => (
                    <Fragment key={`${foreAndBack.b?.id || foreAndBack.f?.id || idx}-length`}>
                        {console.log({foreAndBack, idx}, 'length value') as any as boolean || null}
                        
                        {(!foreAndBack.b?.isHsl && !foreAndBack.f?.isHsl) &&
                            <GridRow foreAndBack={themeVars.vars[idx]} />
                        }
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

