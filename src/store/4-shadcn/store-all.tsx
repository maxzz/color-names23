import { proxy } from "valtio";
import { ShadcnAll } from "./types";
import { shadcnDefaultColor } from "./tailwind-names/default-palette";
import { convertDefaultPaletteToArray } from "./tailwind-names/convert-palette-to-valtio";

export const shadcnAll = proxy<ShadcnAll>({
    allName: 'shadcn',
    tailwindClassNames: convertDefaultPaletteToArray(shadcnDefaultColor),

    // themes: convertFileThemeVarsToPairs(testTheme) || [], // TODO: need to surround with try/catch; handle array values
    // for debugging:
    themes: [], // TODO: need to surround with try/catch; handle array values
});
