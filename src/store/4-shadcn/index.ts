import { proxy } from "valtio";
import { ShadcnPalette } from "./types";
import { shadcnDefaultColor } from "./default-palette";
import { convertDefaultColorsToArray } from "./convert-to-valtio";

export const shadcnPalette = proxy<ShadcnPalette>({
    colors: convertDefaultColorsToArray(shadcnDefaultColor),
});
