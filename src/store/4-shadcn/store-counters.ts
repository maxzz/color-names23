import { proxy, subscribe } from "valtio";
import { AllColorCounters, ThemeVars, GroupColorCounters } from "./types";
import { shadcnAll } from "./store-all";

/**
 * @returns 
 * ```
 * {
 *     '0 0% 100%': 3,
 *     '0 100% 50%': 1,
 *     '0.5rem': 1,
 *     '210 40% 96.1%': 3,
 *     '210 40% 98%': 2,
 *     '214.3 31.8% 91.4%': 2,
 *     '215 20.2% 65.1%': 1,
 *     '215.4 16.3% 46.9%': 1,
 *     '222.2 47.4% 11.2%': 6,
 * }
 * ```
 */
function makeColorCounters(vars: ThemeVars): GroupColorCounters {
    const rv = new Map<string, number>();

    vars.vars.reduce((acc, fb) => {
        checkColor(fb.b?.varValue);
        checkColor(fb.f?.varValue);
        return acc;
    }, rv);

    return Object.fromEntries(rv);
    
    function checkColor(color: string | undefined) {
        if (!color) {
            return;
        }
        if (!rv.has(color)) {
            rv.set(color, 0);
        }
        rv.set(color, (rv.get(color) || 0) + 1);
    }
}

function makeCounterGroups(themeVars: ThemeVars[]): Record<string, GroupColorCounters> {
    const rv = themeVars.map((themeVar) => {
        return [themeVar.name, makeColorCounters(themeVar)];
    });
    return Object.fromEntries(rv);



    // const rv = varGroups.map((varGroup) => {
    //     return {
    //         [varGroup.name]: makeColorCounters(varGroup)
    //     };
    // });
    
    // return rv;



    // const rv = new Map<string, ThemeCounters>();

    // varGroups.forEach((varGroup) => {
    //     rv.set(varGroup.name, {
    //         counters: {
    //             [varGroup.name]: makeColorCounters(varGroup)
    //         }
    //     });
    // });

    // return Object.fromEntries(rv);
}

export const colorCounters = proxy<AllColorCounters>({
    groups: makeCounterGroups(shadcnAll.themes),
});
//console.log('colorCounters', colorCounters.counters);

subscribe(shadcnAll.themes, () => {
    // colorCounters.counters = makeColorCounters(shadcnPalette.varGroups);
    // console.log('shadcnPalette.vars changed', colorCounters.counters);
    console.log('shadcnPalette.vars changed', makeCounterGroups(shadcnAll.themes));
});
