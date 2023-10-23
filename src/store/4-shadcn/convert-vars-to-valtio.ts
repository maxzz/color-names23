import { uuid } from "@/utils";
import { CssVarNameValue, FileThemeVars, ForeAndBack, OneThemeVars } from "./types";

function groupByForeAndBack1(vars: CssVarNameValue[]): ForeAndBack[] {
    const map = new Map<string, ForeAndBack>();
    vars.forEach((v) => {
        let newForeAndBack = map.get(v.name);
        if (!newForeAndBack) {
            newForeAndBack = {};
            map.set(v.name, newForeAndBack);
        }
        newForeAndBack[v.fore ? 'foreground' : 'background'] = v;
    });
    let rv: ForeAndBack[] = [...map.values()];
    rv = rv.filter((fb) => fb.background || fb.foreground);
    return rv;
}

function groupByForeAndBack2(vars: CssVarNameValue[]): ForeAndBack[] {
    const map = new Map<string, ForeAndBack>();
    vars.forEach((v) => {
        let newForeAndBack = map.get(v.name);
        if (!newForeAndBack) {
            newForeAndBack = {};
            map.set(v.name, newForeAndBack);
        }
        newForeAndBack[v.fore ? 'foreground' : 'background'] = v;
    });

    // combine background and foreground
    const bg = map.get('background');
    const fg = map.get('foreground');
    if (bg && fg && fg.background) {
        fg.background.fore = true;
        fg.background.name = 'background';
        bg.foreground = fg.background;
        map.delete('foreground');
    }

    let rv: ForeAndBack[] = [...map.values()];
    rv = rv.filter((fb) => fb.background || fb.foreground);
    return rv;
}

export function convertThemeVars(fileVars: FileThemeVars): OneThemeVars[] {
    const rv: OneThemeVars[] = Object.entries(fileVars).map((entry) => {
        const [varsName, varsValues] = entry;
        const varsValuesPairs = Object.entries(varsValues);

        const vars = varsValuesPairs
            .map(([name, color], idx) => {
                const m = name.match(/^--([^-]+)(-foreground)?$/);
                if (!m) {
                    throw new Error(`Invalid css var name: ${name}`);
                }

                const m2 = color.match(/^(hsl\()?(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%(\))?$/);
                const isHsl = !!m2;

                const [, nameWoDash, fore] = m;
                return {
                    name: nameWoDash,
                    fore: !!fore,
                    value: color,
                    isHsl,
                    order: idx,
                    id: uuid.asRelativeNumber(),
                };
            });
        return {
            name: varsName,
            vars: groupByForeAndBack2(vars),
        };
    });
    return rv;
}
