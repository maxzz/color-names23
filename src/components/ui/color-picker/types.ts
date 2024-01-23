import { HsvaColor as HsvaColorOrg } from "./color-convert";

// color

export type HsvaColor = HsvaColorOrg;

export type ColorPickerState = {
    hsvaColor: HsvaColor;
}

// format

export type FormatItem = {
    name: string;
    format: "hex" | "rgb" | "hsl";
}

export const formatList: FormatItem[] = [
    { name: "Hex", format: "hex" },
    { name: "RGB", format: "rgb" },
    { name: "HSL", format: "hsl" },
];

export type FormatPickerState = {
    formatIdx: number; // index of the selected format
}
