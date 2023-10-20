import { proxy } from "valtio";
import { ShadcnPalette } from "./types";
import { shadcnDefaultColor } from "./default-palette";
import { convertDefaultColorsToArray } from "./convert-to-valtio";
import { testTheme } from "./default-vars";

export const shadcnPalette = proxy<ShadcnPalette>({
    paletteName: 'shadcn',
    colors: convertDefaultColorsToArray(shadcnDefaultColor),
    vars: testTheme,
});
