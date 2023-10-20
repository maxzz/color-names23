import { FileThemeVars, OneThemeVars } from "./types";

export function convertDefaultVersToArray(fileVars: FileThemeVars): OneThemeVars {
    const root = Object.entries(fileVars);
    const varsName = root[0][0];
    const varsValues = Object.entries(root[0][1]);

    const vars = varsValues
        .map(([name, color]) => {
            return [name, color] as [string, string];
        });
    return {
        name: varsName,
        vars: vars,
    };
}
