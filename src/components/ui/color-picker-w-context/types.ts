import { HsvaColor as HsvaColorOrg } from "./color-convert";

export type HsvaColor = HsvaColorOrg;

export type ColorPickerState = {
    hsvaColor: HsvaColor;
}

export type FormatItem = {
    name: string;
    format: "hex" | "rgb" | "hsl";
}

export const formatList: FormatItem[] = [
    { name: "Hex", format: "hex" },
    { name: "RGB", format: "rgb" },
    { name: "HSL", format: "hsl" },
];
