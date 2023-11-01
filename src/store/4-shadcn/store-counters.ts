import { proxy, subscribe } from "valtio";
import { AllThemeCounters, ThemeVars, GroupColorCounters } from "./types";
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

function makeCounterGroups(themeVars: ThemeVars[]): Record<number, GroupColorCounters> {
    const rv = themeVars.map((themeVar) => {
        return [themeVar.themeId, makeColorCounters(themeVar)];
    });
    return Object.fromEntries(rv);
}

export const colorCounters = proxy<AllThemeCounters>({
    themeRoot: makeCounterGroups(shadcnAll.themes),
});
console.log('colorCounters', colorCounters.themeRoot);

export function updateColorCounters() {
    colorCounters.themeRoot = makeCounterGroups(shadcnAll.themes);
    console.log('shadcnPalette.vars changed', makeCounterGroups(shadcnAll.themes));
}

subscribe(shadcnAll.themes, updateColorCounters);
