import { TailwindColorWDefault } from './tailwind-names/types';
import { ThemeVars } from './css-vars/types';

export type ShadcnAll = {
    allName: string;                                // name of all themes
    tailwindClassNames: TailwindColorWDefault[];    // classes for tailwind css vars
    themes: ThemeVars[];                            // theme groups
};

export * from './css-vars/types';
export * from './tailwind-names/types';
