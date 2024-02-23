import type { FileThemes } from "./parse-lines";
import type { ThemeVar, ThemeVars, ThemeVarName, Fbru } from "../types";
import { uuid } from "@/utils";

type FbruObj = {                        // CSS var NameValue with foreground, background, border, or unknown suffixes
    f?: ThemeVar;                       // foreground
    b?: ThemeVar;                       // background
    r?: ThemeVar;                       // border
    s?: ThemeVar[];                     // unknown suffixes
};

function groupByForeAndBack(themeVars: ThemeVar[], combineForeBack: boolean): FbruObj[] {
    const map = new Map<string, FbruObj>();

    themeVars.forEach((v) => {
        let mapSlot = map.get(v.varName);

        if (!mapSlot) {
            mapSlot = {};
            map.set(v.varName, mapSlot);
        }

        if (v.unkSuffix) {
            if (!mapSlot.s) {
                mapSlot.s = [];
            }
            mapSlot.s.push(v);
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

    const rv: FbruObj[] = [...map.values()].filter((fb) => fb.b || fb.f || fb.f || !!fb.s?.length);
    return rv;
}

function mapToVarFBRUa(vars: FbruObj[]): Fbru[] {
    return vars.map((v) => [v.b, v.f, v.r, ...v.s || []]);
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
 * @param fileSelectors
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
export function parseCSSVarsToShadcnGroups(fileSelectors: FileThemes): ThemeVars[] {
    const rv: ThemeVars[] = Object
        .entries(fileSelectors)
        .map<ThemeVars>(
            ([selectorName, selectorValues]) => {
                const selectorValuesEntries = Object.entries(selectorValues);
                const themeId = uuid.asRelativeNumber();
                const errors: string[] = [];

                const vars = selectorValuesEntries
                    .map<ThemeVar | null>(
                        ([name, color], idx) => {
                            const matchedName = name.match(matchName);
                            if (!matchedName) {
                                errors.push(`Invalid css var name: ${name}. Name should start with '--'`);
                                return null;
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
                        }
                    )
                    .filter((v): v is ThemeVar => !!v);

                return {
                    themeId,
                    name: selectorName,
                    vars: mapToVarFBRUa(groupByForeAndBack(vars, true)),
                    errors: errors.length > 0 ? errors : undefined,
                };
            }
        );

    return rv;
}

//TODO: add toaster and catch errors
