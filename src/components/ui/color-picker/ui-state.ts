import { proxy } from "valtio";
import { HsvaColor } from "./color-convert";

export type ColorPickerState = {
    hsvaColor: HsvaColor;
    hexaColor: string;
}

export const colorPickerState = proxy<ColorPickerState>({
    hsvaColor: { h: 0, s: 0, v: 0, a: 1 },
    hexaColor: "#000000",
});
