import { proxy } from "valtio";
import { ShadcnPalette } from "./types";
import { shadcnDefaultColor } from "./default-palette";
import { convertDefaultPaletteToArray } from "./convert-palette-to-valtio";
import { testTheme } from "./default-vars";
import { convertDefaultVarsToArray } from "./convert-vars-to-valtio";

export const shadcnPalette = proxy<ShadcnPalette>({
    paletteName: 'shadcn',
    colors: convertDefaultPaletteToArray(shadcnDefaultColor),
    vars: convertDefaultVarsToArray(testTheme),
});
