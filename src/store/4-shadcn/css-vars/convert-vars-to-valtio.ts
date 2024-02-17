import { ThemeVar, FileThemes, ThemeVarFBR, ThemeVars, ThemeVarName } from "../types";
import { uuid } from "@/utils";

function groupByForeAndBack(themeVars: ThemeVar[], combineForeBack: boolean): ThemeVarFBR[] {
    const map = new Map<string, ThemeVarFBR>();

    themeVars.forEach((v) => {
        let mapSlot = map.get(v.varName);

        if (!mapSlot) {
            mapSlot = {};
            map.set(v.varName, mapSlot);
        }

        if (v.unkSuffix) {
            if (!mapSlot.s) {
                mapSlot.s = {};
            }
            mapSlot.s[v.unkSuffix] = v;
        } else {
            mapSlot[v.isFore ? 'f' : v.isBorder ? 'r' : 'b'] = v;
        }
    });

    if (combineForeBack) { // separate case for global background and foreground var name
        const bg = map.get('background');
        const fg = map.get('foreground');
        if (bg && fg && fg.b) {
            fg.b.isFore = true;
            fg.b.varName = 'background';
            bg.f = fg.b;
            map.delete('foreground');
        }
    }

    let rv: ThemeVarFBR[] = [...map.values()];
    rv = rv.filter((fb) => fb.b || fb.f);

    return rv;
}

function getSuffix(varName: string, suffix?: string): ThemeVarName {
    let isFore = false;
    let isBorder = false;
    let unkSuffix = undefined;

    if (suffix === 'foreground') {
        isFore = true;
    } else if (suffix === 'border') {
        isBorder = true;
    } else if (suffix) {
        unkSuffix = suffix;
    }

    return { varName, isFore, isBorder, unkSuffix };
}

const matchName = /\s*--([^-]+)(?:-([^\s:"',;]*))?\s*/;
const matchHSL = /^\s*(hsl\()?(\d+\.?\d*)\s+(\d+\.?\d*)%\s+(\d+\.?\d*)%(\))?\s*$/;

/**
 * @param fileThemeVars
 * ```
 * {
 *     ":root": {
 *         "--destructive": "0 100% 97%",
 *         "--destructive-foreground": "360 100% 45%",
 *         "--destructive-border": "359 100% 94%",
 *         "--destructive-border2": "359 100% 94%",
 *         "--destructive-border3": "359 100% 94%",
 *     }
 * }
 * ```
 * @returns
 * ```
 [
    {
        "themeId": 521725,
        "name": ":root",
        "vars": [
            {
                "b": {
                    "varName": "destructive",
                    "isFore": false,
                    "isBorder": false,
                    "varValue": "0 100% 97%",
                    "isHsl": true,
                    "order": 0,
                    "id": 846998,
                    "themeId": 846997
                },
                "f": {
                    "varName": "background",
                    "isFore": true,
                    "varValue": "222.2 47.4% 11.2%",
                    "isHsl": true,
                    "order": 1,
                    "id": 521727,
                    "themeId": 521725
                }
            },
            {
                "b": {
                    "varName": "destructive",
                    "isFore": true,
                    "isBorder": false,
                    "varValue": "360 100% 45%",
                    "isHsl": true,
                    "order": 1,
                    "id": 846999,
                    "themeId": 846997
                },
                "r": {
                    "varName": "destructive",
                    "isFore": false,
                    "isBorder": true,
                    "varValue": "359 100% 94%",
                    "isHsl": true,
                    "order": 2,
                    "id": 847000,
                    "themeId": 846997
                },
                "s": {
                    "border2": {
                        "varName": "destructive",
                        "isFore": false,
                        "isBorder": false,
                        "unkSuffix": "border2",
                        "varValue": "359 100% 94%",
                        "isHsl": true,
                        "order": 3,
                        "id": 847001,
                        "themeId": 846997
                    },
                    "border3": {
                        "varName": "destructive",
                        "isFore": false,
                        "isBorder": false,
                        "unkSuffix": "border3",
                        "varValue": "359 100% 94%",
                        "isHsl": true,
                        "order": 4,
                        "id": 847002,
                        "themeId": 846997
                    }
                },
                // ...
            },
            {
                "themeId": 521746,
                "name": ".dark",
                "vars": [
                    // ...
                ]
            }
        ]
    }
]
 * ```
 */
export function convertFileThemeVarsToPairs(fileThemeVars: FileThemes): ThemeVars[] {
    const rv: ThemeVars[] =
        Object.entries(fileThemeVars)
            .map<ThemeVars>((entry) => {
                const [varsName, varsValues] = entry;
                const varsValuesPairs = Object.entries(varsValues);
                const themeId = uuid.asRelativeNumber();

                const vars = varsValuesPairs
                    .map<ThemeVar>(([name, color], idx) => {
                        const matchedName = name.match(matchName);
                        if (!matchedName) {
                            throw new Error(`Invalid css var name: ${name}. Name should start with '--'`);
                        }
                        const [, nameWoDash, nameSuffix] = matchedName;

                        let names = getSuffix(nameWoDash, nameSuffix);

                        //TODO: add check if new name exists in the current theme, then create a new theme

                        const matchedVakue = color.match(matchHSL);
                        const isHsl = !!matchedVakue;

                        const rv: ThemeVar = {
                            ...names,
                            varValue: color,
                            isHsl,
                            order: idx,
                            id: uuid.asRelativeNumber(),
                            themeId,
                        };

                        return rv;
                    });

                return {
                    themeId,
                    name: varsName,
                    vars: groupByForeAndBack(vars, true),
                };
            });
    return rv;
}

//TODO: add toaster and catch errors
