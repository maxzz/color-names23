import { ColorItem, ColorTuple3 } from ".";

export enum SortBy {
    none,
    name,
    rgb,
    hsl,
}

const compareColors = (a: ColorTuple3, b: ColorTuple3) => (a[0] - b[0] || a[1] - b[1] || a[2] - b[2]); // The same for rgb and hsl

export const compareNames = (a: ColorItem, b: ColorItem) => a.name.localeCompare(b.name);
export const compareRgb = (a: ColorItem, b: ColorItem) => compareColors(a.rgb, b.rgb);
export const compareHsl = (a: ColorItem, b: ColorItem) => compareColors(a.hsl, b.hsl);

export const sortColorItemsFn = (s: SortBy) => {
    return s === SortBy.name ? compareNames : s === SortBy.rgb ? compareRgb : s === SortBy.hsl ? compareHsl : null;
};
