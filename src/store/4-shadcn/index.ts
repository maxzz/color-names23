import { proxy, subscribe } from "valtio";
import { ColorCounters, ShadcnPalette } from "./types";
import { shadcnDefaultColor } from "./default-palette";
import { convertDefaultPaletteToArray } from "./convert-palette-to-valtio";
import { testTheme } from "./default-vars";
import { makeColorCounters, convertThemeVars } from "./convert-vars-to-valtio";

export const shadcnPalette = proxy<ShadcnPalette>({
    paletteName: 'shadcn',
    colors: convertDefaultPaletteToArray(shadcnDefaultColor),
    varGroups: convertThemeVars(testTheme)?.[0] || [], // TODO: need to surround with try/catch; handle array values
});

export const colorCounters = proxy<ColorCounters>({
    counters: makeColorCounters(shadcnPalette.varGroups),
});
console.log('colorCounters', colorCounters.counters);

subscribe(shadcnPalette.varGroups, () => {
    colorCounters.counters = makeColorCounters(shadcnPalette.varGroups);
    console.log('shadcnPalette.vars changed', colorCounters.counters);
});
