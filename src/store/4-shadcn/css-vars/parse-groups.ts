import { FileThemes } from "./parse-lines";
import type { CSSRuleObject, RecursiveKeyValuePair } from 'tailwindcss/types/config';

/**
*```
* {
*   "--background": "0 0% 100%",
*   "--foreground": "222.2 47.4% 11.2%",
*   "--warning": {
*       "DEFAULT": "49 100% 97%",
*       "foreground": "31 92% 45%",
*       "border": "49 91% 91%",
*   },
* }
*```
*/
type ValueVar = Record<string, string>; // name -> value | Record<subName, value> // subName: 'DEFAULT' | 'foreground' | 'border' i.e. wo/ group name
type ValueVars = Record<string, ValueVar>;

/**
 * ```
 * in: --name-suffix-1-333
 * out: ["name", "suffix-1-333"]
 * ```
 */
const reVarName = /^--([^-]+)(?:-(.*))?/;

/**
 * 
 * @param fileThemes 
 * ```json
 * {
 *     ":root": {
 *         "--background": "0 0% 100%",
 *         "--foreground": "222.2 47.4% 11.2%",
 * 
 *         "--warning": "49 100% 97%",
 *         "--warning-foreground": "31 92% 45%",
 *         "--warning-border": "49 91% 91%",
 * 
 *         "--mani-destructive": "359 100% 94%",
 *         "--mani-destructive-border": "359 100% 94%",
 *         "--mani-destructive-border3": "359 100% 94%",
 *     },
 *     ".dark": {
 *         "--background": "224 71% 4%",
 *         "--foreground": "213 31% 91%",
 *     }
 * }
 * ```
 * @returns 
 * now:
 * ```json
 * {
 *     ":root": {
 *         "background": {DEFAULT: "0 0% 100%"},
 *         "foreground": {DEFAULT: "222.2 47.4% 11.2%"},
 *
 *         "warning": {
 *              "DEFAULT": "49 100% 97%",
 *              "foreground": "31 92% 45%",
 *              "border": "49 91% 91%",
 *         },
 *        "mani": {
 *             "destructive": "359 100% 94%",
 *             "destructive-border": "359 100% 94%",
 *             "destructive-border3": "359 100% 94%",
 *       },
 *     },
 *     ".dark": {
 *         "background": {DEFAULT: "224 71% 4%"},
 *         "foreground": {DEFAULT: "213 31% 91%"},
 *     }
 * }
 * ```
 * should be:
 * ```json
 * {
 *     ":root": {
 *         "background": "0 0% 100%",
 *         "foreground": "222.2 47.4% 11.2%",
 *
 *         "warning": {
 *              "DEFAULT": "49 100% 97%",
 *              "foreground": "31 92% 45%",
 *              "border": "49 91% 91%",
 *         },
 *         "mani": {
 *              "destructive": {
 *                  "DEFAULT": "359 100% 94%",
 *                  "border": "359 100% 94%",
 *                  "border3": "359 100% 94%",
 *            },
 *         },
 *     },
 *     ".dark": {
 *         "background": "224 71% 4%",
 *         "foreground": "213 31% 91%",
 *     }
 * }
 * ```
 */
export function parseToGroups(fileThemes: FileThemes) {
    const groups: Record<string, RecursiveKeyValuePair> = {}; // themeName -> ValueVars

    Object.entries(fileThemes).forEach(([themeName, theme]) => {
        groups[themeName] = themeToGrouppedVars(theme);
    });

    return groups;

    function themeToGrouppedVars(vars: Record<string, string>) {
        let rv: RecursiveKeyValuePair = {};
        const invalidNames: Record<string, string>[] = [];
        console.log(Array(60).fill('\n').join(''));

        Object.entries(vars).forEach(
            ([name, value]) => {
                console.log(`%cname: ${name} value: '${value}'`, 'background: #222; color: #bada55', 'rv', rv);

                if (!name.startsWith('--')) {
                    invalidNames.push({ [name]: value });
                    return;
                }

                const subnames = name.slice(2).split('-');

                rv = subnames.reduce((acc, subname, i) => {
                    console.log(`  ${' '.repeat(i * 2)}subname: ${subname}`, 'acc', acc);

                    if (i === subnames.length - 1) {
                        acc[subname] = value;
                        return rv;
                    }

                    if (!acc[subname]) {
                        acc[subname] = {};
                        return acc[subname] as RecursiveKeyValuePair;
                    }

                    if (typeof acc[subname] === 'string') {
                        acc = { DEFAULT: acc[subname] };
                        return acc;
                    }

                    return acc[subname] as RecursiveKeyValuePair;
                }, rv);
            }
        );

        if (invalidNames.length) {
            console.warn(`Invalid CSS variable names:`, invalidNames);
        }

        return rv;
    }
}

// const match = reVarName.exec(name);
// if (match) {
//     const [_, group, key] = match;
//     if (!rv[group]) {
//         rv[group] = {};
//     }
//     rv[group][key || 'DEFAULT'] = value;
// } else {
//     invalidNames.push({ [name]: value });
// }

//G: 'convert js array to nested object'
//https://stackoverflow.com/questions/52077140/convert-array-into-nested-object 'Convert array into nested object'
// const keys = ['product', 'model', 'version'];
// const result = keys.reverse().reduce((res, key) => ({ [key]: res }), {});
// //                                   innermost value to start with ^^
// console.log(result);
