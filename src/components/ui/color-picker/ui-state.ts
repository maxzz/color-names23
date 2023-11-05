import { proxy } from "valtio";
import { HsvaColor } from "./color-convert";

export type ColorPickerState = {
    hsvaColor: HsvaColor;
    hexColor: string;
}

export const colorPickerState = proxy<ColorPickerState>({
    hsvaColor: { h: 0, s: 0, v: 0, a: 1 },
    hexColor: "#000000",
});
