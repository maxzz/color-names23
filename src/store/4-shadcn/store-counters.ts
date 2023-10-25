import { proxy, subscribe } from "valtio";
import { ColorCounters, OneThemeVars } from "./types";
import { shadcnPalette } from "./store-palette";

function makeColorCounters(vars: OneThemeVars): Record<string, number> {
    const rv = new Map();

    function checkColor(color: string | undefined) {
        if (!color) {
            return;
        }
        if (!rv.has(color)) {
            rv.set(color, 0);
        }
        rv.set(color, rv.get(color) + 1);
    }

    vars.vars.reduce((acc, fb) => {
        checkColor(fb.b?.value);
        checkColor(fb.f?.value);
        return acc;
    }, rv);

    return Object.fromEntries(rv);
}

export const colorCounters = proxy<ColorCounters>({
    counters: makeColorCounters(shadcnPalette.varGroups),
});
//console.log('colorCounters', colorCounters.counters);

subscribe(shadcnPalette.varGroups, () => {
    colorCounters.counters = makeColorCounters(shadcnPalette.varGroups);
    console.log('shadcnPalette.vars changed', colorCounters.counters);
});
