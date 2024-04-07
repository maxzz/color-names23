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

        // console.log(Array(60).fill('\n').join(''));
        console.log('-----------------------------------------------------');

        Object.entries(vars).forEach(
            ([name, value]) => {
                console.log(`%cname: ${name} value: '${value}'`, 'background: #222; color: #bada55', 'rv', rv);

                if (!name.startsWith('--')) {
                    invalidNames.push({ [name]: value });
                    return;
                }

                const subnames = name.slice(2).split('-');

                const newObj = subnames.reverse().reduce((res, key, idx) => ({ [key]: !idx ? value : res }), {});
                console.log('newObj', JSON.stringify(newObj));

                rv = mergeObjectsRecursive(rv, newObj);
            }
        );

        if (invalidNames.length) {
            console.warn(`Invalid CSS variable names:`, invalidNames);
        }

        return rv;
    }
}

function mergeObjectsRecursive(o1: Record<string, any>, o2: Record<string, any>) {
    const rv = { ...o1 };

    const o2Entries = Object.entries(o2);
    o2Entries.forEach(
        ([key, value], idx) => {
            if (rv[key] && typeof rv[key] === 'object' && typeof value === 'object') {
                console.log('ooo', `rv[${key}] =`, rv[key], 'value =', value, 'rv =', rv);
                rv[key] = mergeObjectsRecursive(rv[key], value);
            } else {
                if (typeof rv[key] === 'string') {
                    rv[key] = { DEFAULT: rv[key], [key]: idx === o2Entries.length - 1 ? value : {} };
                } else {
                    rv[key] = value;
                }
                console.log('+++', `rv[${key}] =`, rv[key], 'value =', value, 'rv =', rv);
            }
        }
    );

    console.log('-----------------rv', rv);
    return rv;
}

/*cop* /
function mergeObjectsRecursive(o1: Record<string, any>, o2: Record<string, any>) {
    const rv = { ...o1 };

    Object.entries(o2).forEach(
        ([key, value]) => {
            if (rv[key] && typeof rv[key] === 'object' && typeof value === 'object') {
                rv[key] = mergeObjectsRecursive(rv[key], value);
            } else {
                rv[key] = value;
            }
        }
    );

    return rv;
}
/**/

/** /
                let current = rv;

                subnames.forEach((subname, i) => {
                    console.log(`  ${' '.repeat(i * 2)}subname: ${subname}`, 'rv', rv);

                    if (i === subnames.length - 1) {
                        if (typeof current[subname] === 'string') {
                            current = { 'DEFAULT': current[subname], [subname]: value };
                        } else {
                            current[subname] = value;
                        }
                        return;
                    }

                    if (!current[subname]) {
                        current[subname] = {};
                        current = current[subname] as RecursiveKeyValuePair;
                    }

                    if (typeof current !== 'string') {
                        current = current[subname] as RecursiveKeyValuePair;
                    }
                });
/**/

/** /
const match = reVarName.exec(name);
if (match) {
    const [_, group, key] = match;
    if (!rv[group]) {
        rv[group] = {};
    }
    rv[group][key || 'DEFAULT'] = value;
} else {
    invalidNames.push({ [name]: value });
}
/**/

/** /
//G: 'convert js array to nested object'
//https://stackoverflow.com/questions/52077140/convert-array-into-nested-object 'Convert array into nested object'
// const keys = ['product', 'model', 'version'];
// const result = keys.reverse().reduce((res, key) => ({ [key]: res }), {});
// //                                   innermost value to start with ^^
// console.log(result);

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
/**/


/** /
//G: 'js merge two objects'

                const newObj = subnames.reverse().reduce((res, key) => ({ [key]: res }), {});
                console.log('newObj', JSON.stringify(newObj, null, 4));

                // newObj {
                //     "destructive": {
                //         "foreground": {}
                //     }
                // }                

//https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects 'How can I merge properties of two JavaScript objects?'
                var t1 = {
                    key1: 1,
                    key2: "test",
                    key3: [5, 2, 76, 21]
                };
                var t2 = {
                    key1: {
                        ik1: "hello",
                        ik2: "world",
                        ik3: 3
                    }
                };
                var t3 = {
                    key2: 3,
                    key3: {
                        t1: 1,
                        t2: 2,
                        t3: {
                            a1: 1,
                            a2: 3,
                            a4: [21, 3, 42, "asd"]
                        }
                    }
                };
                
                var merge = function(...args: Record<string, any>[]) {
                    var obj = {},
                        i = 0,
                        il = args.length,
                        key;
                    for (; i < il; i++) {
                        for (key in args[i]) {
                            if (args[i].hasOwnProperty(key)) {
                                obj[key] = args[i][key];
                            }
                        }
                    }
                    return obj;
                };
                
                console.log(merge(t1, t2));
                console.log(merge(t1, t3));
                console.log(merge(t2, t3));
                console.log(merge(t1, t2, t3));
                console.log(merge({}, t1, { key1: 1 }));
/**/
