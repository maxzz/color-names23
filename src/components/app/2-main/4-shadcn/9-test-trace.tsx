import { INTERNAL_Snapshot } from "valtio";
import { ThemeVar, Fbru, ThemeVars, fbruKeyEnum } from "@/store";

function strStringify(obj: object): string {
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

function limitThemeVar(tv: ThemeVar): { themeId: number; varName: string; id: number; } {
    const { themeId, varName, id } = tv;
    return { themeId, varName, id };
}

export function strThemeVarFB(tv: INTERNAL_Snapshot<Fbru>): string {
    const rv = tv
        .map((v, idx) => v ? `${fbruKeyEnum[idx]}: ${strStringify(limitThemeVar(v))}` : '')
        .filter((v) => v)
        .join(',\n    ');
    return `{\n    ${rv}\n}`;
}

export function strThemeVarFBArr2(tv: INTERNAL_Snapshot<Fbru[]>): string {
    return tv
        .map((v) => {
            return strThemeVarFB(v);
        })
        .join(',\n')
        .replaceAll(/},\r?\n\s*{/g, '    }, {');
}

export function strThemeVarFBArr(tv: INTERNAL_Snapshot<Fbru[]>): string {
    return tv
        .map((v) => {
            return strThemeVarFB(v);
        })
        .join(',\n')
        .replaceAll(/},\r?\n\s*{/g, '    }, {');
}

export function strThemeVars(tvars: INTERNAL_Snapshot<ThemeVars>): string {
    return JSON.stringify({
        ...tvars,
        vars: Object.fromEntries(tvars.vars.map(
            (tv) => tv.map(
                (v, idx) => v ? [fbruKeyEnum[idx], strStringify(limitThemeVar(v))] : null
            ).filter((v) => v)
        ))
    }, null, 4)
        .replaceAll(/},\r?\n\s*{/g, '}, {')
        .replaceAll(/\[\r?\n\s*{/g, '[ {');
}

export function strThemesVars(tv?: INTERNAL_Snapshot<ThemeVars[]>): string {
    if (!tv?.length) {
        return '[]';
    }
    return (tv || []).map((v) => strThemeVars(v)).join('\n');
}
