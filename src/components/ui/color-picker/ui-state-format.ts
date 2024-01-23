import { proxy } from "valtio";
import { FormatPickerState } from "./types";

// export type FormatItem = {
//     name: string;
//     format: "hex" | "rgb" | "hsl";
// }

// export const formatList: FormatItem[] = [
//     { name: "Hex", format: "hex" },
//     { name: "RGB", format: "rgb" },
//     { name: "HSL", format: "hsl" },
// ];

// export type FormatPickerState = {
//     formatIdx: number; // index of the selected format
// }

export const formatPickerState = proxy<FormatPickerState>({
    formatIdx: 0,
});
