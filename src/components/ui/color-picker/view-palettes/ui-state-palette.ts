import { proxy } from "valtio";
import { ColorPickerPalette, materialPalette, tailwindPalette } from "./palettes";

export const paletteList: ColorPickerPalette[] = [
    materialPalette,
    tailwindPalette,
];

export type PalettePickerState = {
    activePaletteIdx: number;
}

export const palettePickerState = proxy<PalettePickerState>({
    activePaletteIdx: 0,
});
