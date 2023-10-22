import { OneThemeVars } from './css-var-values';
import { TwDoubleColor } from './palette';

export * from './css-var-values';
export * from './palette';

export type ShadcnPalette = {
    paletteName: string;
    colors: TwDoubleColor[];
    vars: OneThemeVars;         // TODO: this will be later as OneThemeVars[]
};