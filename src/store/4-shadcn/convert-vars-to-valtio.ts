import { CssVarNameValue, FileThemeVars, ForeAndBack, OneThemeVars } from "./types";
import { uuid } from "@/utils";

function groupByForeAndBack(vars: CssVarNameValue[], combineForeBack: boolean): ForeAndBack[] {
    const map = new Map<string, ForeAndBack>();
    vars.forEach((v) => {
        let newForeAndBack = map.get(v.name);
        if (!newForeAndBack) {
            newForeAndBack = {};
            map.set(v.name, newForeAndBack);
        }
        newForeAndBack[v.fore ? 'f' : 'b'] = v;
    });

    if (combineForeBack) {
        const bg = map.get('background');
        const fg = map.get('foreground');
        if (bg && fg && fg.b) {
            fg.b.fore = true;
            fg.b.name = 'background';
            bg.f = fg.b;
            map.delete('foreground');
        }
    }

    let rv: ForeAndBack[] = [...map.values()];
    rv = rv.filter((fb) => fb.b || fb.f);
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
