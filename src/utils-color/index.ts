export type ColorTuple3 = [number, number, number];

export interface ColorItem {
    name: string;
    hex: string;
    hsl: ColorTuple3; // h: 0..360, s: 0..100%, l: 0..100%
    rgb: ColorTuple3; // r: 0..255, g: 0..255, b: 0..255
    dark: boolean;
}

export const formatRGB = (rgb: ColorTuple3) => `rgb(${rgb.join(', ')})`;
export const formatHSL = (hsl: ColorTuple3) => `hsl(${hsl.map((item, idx) => !idx ? item : `${item}%`).join(', ')})`;
export const formatHSLMono = (hsl: ColorTuple3) => `hsl(${hsl.map((item, idx) => {
    return !idx ? `${item}`.padStart(3, ' ') : `${`${item}`.padStart(4, ' ')}%`;
}).join(', ')})`;

export * from './sortColors';
export { allColorsWoAlternatives } from './allColors';
export { groupColors } from './groupColors';
export { isLightColor } from './isLightColor';
