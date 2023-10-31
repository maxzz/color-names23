import { ThemeVar, FileThemeVars, ThemeVarFB, ThemeVars } from "../types";
import { uuid } from "@/utils";

function groupByForeAndBack(themeVars: ThemeVar[], combineForeBack: boolean): ThemeVarFB[] {
    const map = new Map<string, ThemeVarFB>();

    themeVars.forEach((v) => {
        let newForeAndBack = map.get(v.varName);
        if (!newForeAndBack) {
            newForeAndBack = {};
            map.set(v.varName, newForeAndBack);
        }
        newForeAndBack[v.isFore ? 'f' : 'b'] = v;
    });

    if (combineForeBack) {
        const bg = map.get('background');
        const fg = map.get('foreground');
        if (bg && fg && fg.b) {
            fg.b.isFore = true;
            fg.b.varName = 'background';
            bg.f = fg.b;
            map.delete('foreground');
        }
    }

    let rv: ThemeVarFB[] = [...map.values()];
    rv = rv.filter((fb) => fb.b || fb.f);

    return rv;
}

const matchFore = /^\s*--([^-]+)(-foreground)?\s*$/;
const matchHSL = /^\s*(hsl\()?(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%(\))?\s*$/;

export function convertFileThemeVarsToPairs(fileThemeVars: FileThemeVars): ThemeVars[] {
    const rv: ThemeVars[] =
        Object.entries(fileThemeVars)
            .map((entry) => {
                const [varsName, varsValues] = entry;
                const varsValuesPairs = Object.entries(varsValues);

                const vars = varsValuesPairs
                    .map(([name, color], idx) => {
                        const m = name.match(matchFore);
                        if (!m) {
                            throw new Error(`Invalid css var name: ${name}. Name should start with '--'`);
                        }
                        const [, nameWoDash, fore] = m;

                        //TODO: add check if new name exists in the current theme, then create a new theme

                        const m2 = color.match(matchHSL);
                        const isHsl = !!m2;

                        return {
                            varName: nameWoDash,
                            fore: !!fore,
                            varValue: color,
                            isHsl,
                            order: idx,
                            id: uuid.asRelativeNumber(),
                            themeName: varsName,
                        };
                    });
                return {
                    name: varsName,
                    vars: groupByForeAndBack(vars, true),
                };
            });
    return rv;
}

//TODO: add toaster and catch errors
