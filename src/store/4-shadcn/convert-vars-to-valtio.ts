import { uuid } from "@/utils";
import { CssVarNameValue, FileThemeVars, ForeAndBack, OneThemeVars } from "./types";

function groupByForeAndBack(vars: CssVarNameValue[]): ForeAndBack[] {
    let rv: ForeAndBack[] = [];
    const map = new Map<string, ForeAndBack>();
    vars.forEach((v) => {
        let fb = map.get(v.name);
        if (!fb) {
            fb = {} as ForeAndBack;
            map.set(v.name, fb);
            rv.push(fb);
        }
        fb[v.fore ? 'foreground' : 'background'] = v;
    });
    rv = rv.filter((fb) => !fb.background && !fb.foreground);
    return rv;
}

export function convertDefaultVarsToArray(fileVars: FileThemeVars): OneThemeVars {
    const rootFirst = Object.entries(fileVars);
    if (!rootFirst.length) {
        throw new Error('FileThemeVars is empty');
    }

    const rv: OneThemeVars[] = [];

    const [varsName, varsValues] = rootFirst[0];
    const varsValuesPairs = Object.entries(varsValues);

    const vars = varsValuesPairs
        .map(([name, color], idx) => {
            const m = name.match(/^--([^-]+)(-foreground)?$/);
            if (!m) {
                throw new Error(`Invalid css var name: ${name}`);
            }

            const [, nameWoDash, fore] = m;
            return {
                name: nameWoDash,
                fore: !!fore,
                value: color,
                order: idx,
                id: uuid.asRelativeNumber(),
            };
        });
    return {
        name: varsName,
        vars: groupByForeAndBack(vars),
    };
}
