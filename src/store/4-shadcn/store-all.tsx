import { proxy, subscribe } from "valtio";
import { ShadcnAll } from "./types";
import { shadcnDefaultColor } from "./tailwind-names/default-palette";
import { convertDefaultPaletteToArray } from "./tailwind-names/convert-palette-to-valtio";
import { testTheme } from "./css-vars/default-vars";
import { convertFileThemeVarsToPairs } from "./css-vars/convert-vars-to-valtio";

export const shadcnAll = proxy<ShadcnAll>({
    allName: 'shadcn',
    tailwindClassNames: convertDefaultPaletteToArray(shadcnDefaultColor),
    themes: convertFileThemeVarsToPairs(testTheme) || [], // TODO: need to surround with try/catch; handle array values
});

export const themesCount = proxy({
    count: 0,
});

themesCount.count = shadcnAll.themes.length;
console.log('shadcnAll.themes ini', shadcnAll.themes.length, themesCount.count);

subscribe(shadcnAll, () => {
    console.log('shadcnAll.themes', shadcnAll.themes);
    
    themesCount.count = shadcnAll.themes.length;
});
