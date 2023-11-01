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

/**
 * @param fileThemeVars
 * ```
 * {
 *     ":root": {
 *         "--background": "0 0% 100%",
 *         "--foreground": "222.2 47.4% 11.2%",
 *         "--muted": "210 40% 96.1%",
 *         "--muted-foreground": "215.4 16.3% 46.9%",
 *         ...
 *         "--ring": "215 20.2% 65.1%",
 *         "--radius": "0.5rem"
 *     }
 * }
 * ```
 * @returns
 * ```
 * [
 *     {
 *         "themeId": 521725,
 *         "name": ":root",
 *         "vars": [
 *             {
 *                 "b": {
 *                     "varName": "background",
 *                     "isFore": false,
 *                     "varValue": "0 0% 100%",
 *                     "isHsl": true,
 *                     "order": 0,
 *                     "id": 521726,
 *                     "themeId": 521725
 *                 },
 *                 "f": {
 *                     "varName": "background",
 *                     "isFore": true,
 *                     "varValue": "222.2 47.4% 11.2%",
 *                     "isHsl": true,
 *                     "order": 1,
 *                     "id": 521727,
 *                     "themeId": 521725
 *                 }
 *             },
 *             {
 *                 "b": {
 *                     "varName": "muted",
 *                     "isFore": false,
 *                     "varValue": "210 40% 96.1%",
 *                     "isHsl": true,
 *                     "order": 2,
 *                     "id": 521728,
 *                     "themeId": 521725
 *                 },
 *                 "f": {
 *                     "varName": "muted",
 *                     "isFore": true,
 *                     "varValue": "215.4 16.3% 46.9%",
 *                     "isHsl": true,
 *                     "order": 3,
 *                     "id": 521729,
 *                     "themeId": 521725
 *                 }
 *             },
 *             ...
 *         ]
 *     },
 *     {
 *         "themeId": 521746,
 *         "name": ".dark",
 *         "vars": [
 *             {
 *                 "b": {
 *                     "varName": "background",
 *                     "isFore": false,
 *                     "varValue": "224 71% 4%",
 *                     "isHsl": true,
 *                     "order": 0,
 *                     "id": 521747,
 *                     "themeId": 521746
 *                 },
 *                 "f": {
 *                     "varName": "background",
 *                     "isFore": true,
 *                     "varValue": "213 31% 91%",
 *                     "isHsl": true,
 *                     "order": 1,
 *                     "id": 521748,
 *                     "themeId": 521746
 *                 }
 *             },
 *             {
 *                 "b": {
 *                     "varName": "muted",
 *                     "isFore": false,
 *                     "varValue": "223 47% 11%",
 *                     "isHsl": true,
 *                     "order": 2,
 *                     "id": 521749,
 *                     "themeId": 521746
 *                 },
 *                 "f": {
 *                     "varName": "muted",
 *                     "isFore": true,
 *                     "varValue": "215.4 16.3% 56.9%",
 *                     "isHsl": true,
 *                     "order": 3,
 *                     "id": 521750,
 *                     "themeId": 521746
 *                 }
 *             },
 *             ...
 *        ]
 *     }
 * ]
 * ```
 */
export function convertFileThemeVarsToPairs(fileThemeVars: FileThemeVars): ThemeVars[] {
    const rv: ThemeVars[] =
        Object.entries(fileThemeVars)
            .map<ThemeVars>((entry) => {
                const [varsName, varsValues] = entry;
                const varsValuesPairs = Object.entries(varsValues);
                const themeId = uuid.asRelativeNumber();

                const vars = varsValuesPairs
                    .map<ThemeVar>(([name, color], idx) => {
                        const m = name.match(matchFore);
                        if (!m) {
                            throw new Error(`Invalid css var name: ${name}. Name should start with '--'`);
                        }
                        const [, nameWoDash, fore] = m;

                        //TODO: add check if new name exists in the current theme, then create a new theme

                        const m2 = color.match(matchHSL);
                        const isHsl = !!m2;

                        const rv: ThemeVar = {
                            varName: nameWoDash,
                            isFore: !!fore,
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
