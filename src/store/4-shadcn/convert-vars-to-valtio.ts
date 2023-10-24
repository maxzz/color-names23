import { uuid } from "@/utils";
import { CssVarNameValue, FileThemeVars, ForeAndBack, OneThemeVars } from "./types";

function groupByForeAndBack(vars: CssVarNameValue[], combineForeBack: boolean): ForeAndBack[] {
    const map = new Map<string, ForeAndBack>();
    vars.forEach((v) => {
        let newForeAndBack = map.get(v.name);
        if (!newForeAndBack) {
            newForeAndBack = {};
            map.set(v.name, newForeAndBack);
        }
        newForeAndBack[v.fore ? 'foreground' : 'background'] = v;
    });

    if (combineForeBack) {
        const bg = map.get('background');
        const fg = map.get('foreground');
        if (bg && fg && fg.background) {
            fg.background.fore = true;
            fg.background.name = 'background';
            bg.foreground = fg.background;
            map.delete('foreground');
        }
    }

    let rv: ForeAndBack[] = [...map.values()];
    rv = rv.filter((fb) => fb.background || fb.foreground);
    return rv;
}

const matchFore = /^\s*--([^-]+)(-foreground)?\s*$/;
const matchHSL = /^\s*(hsl\()?(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%(\))?\s*$/;

export function convertThemeVars(fileVars: FileThemeVars): OneThemeVars[] {
    const rv: OneThemeVars[] = Object.entries(fileVars).map((entry) => {
        const [varsName, varsValues] = entry;
        const varsValuesPairs = Object.entries(varsValues);

        const vars = varsValuesPairs
            .map(([name, color], idx) => {
                const m = name.match(matchFore);
                if (!m) {
                    throw new Error(`Invalid css var name: ${name}. Name should start with '--'`);
                }
                const [, nameWoDash, fore] = m;

                const m2 = color.match(matchHSL);
                const isHsl = !!m2;

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
            vars: groupByForeAndBack(vars, true),
        };
    });
    return rv;
}

export function makeColorCounters(vars: OneThemeVars): Record<string, number> {
    const rv = new Map();

    vars.vars.reduce((acc, fb) => {
        const color = fb.background?.value || fb.foreground?.value;
        if (!color) {
            return acc;
        }
        if (!rv.has(color)) {
            rv.set(color, 0);
        }
        rv.set(color, rv.get(color) + 1);
        return acc;
    }, rv);

    return Object.fromEntries(rv);
}
