import { proxy } from "valtio";
import { ShadcnAll } from "./types";
import { fileTwColorDefaultToArray, initialShadcnTwVars } from "./tailwind-names";

export const shadcnAll = proxy<ShadcnAll>({
    allName: 'shadcn',
    tailwindClassNames: fileTwColorDefaultToArray(initialShadcnTwVars),

    // themes: convertFileThemeVarsToPairs(testTheme) || [], // TODO: need to surround with try/catch; handle array values
    // for debugging:
    themes: [], // TODO: need to surround with try/catch; handle array values
});
