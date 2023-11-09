import { proxy } from "valtio";

export type PalettePickerState = {
    paletteName: string;
}

export const palettePickerState = proxy<PalettePickerState>({
    paletteName: '',
});
