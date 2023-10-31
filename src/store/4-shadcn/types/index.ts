import { TailwindColorWDefault } from './tailwind-names';
import { ThemeVars } from './css-vars';

export type ShadcnAll = {
    allName: string;                                // name of all themes
    tailwindClassNames: TailwindColorWDefault[];    // classes for tailwind css vars
    themes: ThemeVars[];                            // theme groups
};

export * from './css-vars';
export * from './tailwind-names';
