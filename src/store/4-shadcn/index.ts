import { proxy, subscribe } from "valtio";
import { ColorCounters, ShadcnPalette } from "./types";
import { shadcnDefaultColor } from "./default-palette";
import { convertDefaultPaletteToArray } from "./convert-palette-to-valtio";
import { testTheme } from "./default-vars";
import { makeColorCounters, convertThemeVars } from "./convert-vars-to-valtio";

export const shadcnPalette = proxy<ShadcnPalette>({
    paletteName: 'shadcn',
    colors: convertDefaultPaletteToArray(shadcnDefaultColor),
    vars: convertThemeVars(testTheme)?.[0] || [], // TODO: need to surround with try/catch; handle array values
});

export const colorCounters = proxy<ColorCounters>(makeColorCounters(shadcnPalette.vars));
console.log('colorCounters', colorCounters);

subscribe(shadcnPalette.vars, () => {
    console.log('shadcnPalette.vars changed');
    makeColorCounters(shadcnPalette.vars);
});
