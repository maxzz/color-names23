import { ThemeVars } from './css-var-values';
import { TwDoubleColor } from './palette';

export * from './css-var-values';
export * from './palette';

export type ShadcnAll = {
    allName: string;                        // name of all themes
    tailwindClassNames: TwDoubleColor[];    // vars for tailwind classes
    groups: ThemeVars[];                 // theme groups
};
