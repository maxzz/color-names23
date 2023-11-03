import { INTERNAL_Snapshot } from "valtio";
import { ThemeVar, ThemeVarFB, ThemeVars } from "@/store";

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

function limitThemeVar(tv: ThemeVar) {
    const { themeId, varName, id } = tv;
    return { themeId, varName, id };
}

export function strThemeVarFB(tv: ThemeVarFB) {
    const f = tv.f ? `f: {${strStringify(limitThemeVar(tv.f))}}` : '';
    const b = tv.b ? `b: {${strStringify(limitThemeVar(tv.b))}}` : '';
    const rv = [f, b].filter((v) => v).join(',\n    ');
    return `{\n    ${rv}\n}`;
}

export function strThemeVarFBArr(tv: INTERNAL_Snapshot<ThemeVarFB[]>) {
    return tv.map((v) => strThemeVarFB(v))
        .join(',\n')
        .replaceAll(/},\r?\n\s*{/g, '    }, {');
}

export function strThemeVars(tvars: INTERNAL_Snapshot<ThemeVars>) {
    return JSON.stringify({
        ...tvars,
        vars: tvars.vars.map((tv) => ({
            ...(tv.f && { f: strStringify(limitThemeVar(tv.f)) }),
            ...(tv.b && { b: strStringify(limitThemeVar(tv.b)) }),
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
