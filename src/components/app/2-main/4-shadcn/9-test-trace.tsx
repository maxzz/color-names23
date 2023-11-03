import { INTERNAL_Snapshot } from "valtio";
import { ThemeVarFB, ThemeVars } from "@/store";

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
