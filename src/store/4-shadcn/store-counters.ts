import { proxy, subscribe } from "valtio";
import { AllColorCounters, OneTheme, GroupColorCounters } from "./types";
import { shadcnAll } from "./store-all";

function makeColorCounters(vars: OneTheme): Record<string, number> {
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

function makeCounterGroups(varGroups: OneTheme[]): Record<string, GroupColorCounters> {
    const rv = varGroups.map((varGroup) => {
        return [varGroup.name, makeColorCounters(varGroup)];
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
    groups: makeCounterGroups(shadcnAll.groups),
});
//console.log('colorCounters', colorCounters.counters);

subscribe(shadcnAll.groups, () => {
    // colorCounters.counters = makeColorCounters(shadcnPalette.varGroups);
    // console.log('shadcnPalette.vars changed', colorCounters.counters);
    console.log('shadcnPalette.vars changed', makeCounterGroups(shadcnAll.groups));
});
