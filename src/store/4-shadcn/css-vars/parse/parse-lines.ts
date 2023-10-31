import { FileThemeVars, ThemeVarsParsed } from "../../types";

// ":root": {
// :root: {
// "dark": {
// .dark: {
const isThemeNameRegex = /^\s*(['"])?([\.\:]?[a-zA-Z0-9\-]+)(?:['"])?\s*:?\s* \{\s*$/;

// "--background": "224 71% 4%",
// --background: 159 65% 4%;
const isCSSVarRegex = /^\s*(['"])?--([a-zA-Z0-9\-]+)(?:['"])?\s*:\s*(?:['"])?([^;"']+)(?:['"])?\s*[;,]?\s*$/;

export function parseTextToThemeVarsArray(text: string): ThemeVarsParsed[] {
    let rv: ThemeVarsParsed[] = [];

    let current: ThemeVarsParsed = { name: 'root', values: {} };
    rv.push(current);

    text.split(/\r?\n/)
        .forEach((line) => {
            const isVar = isCSSVarRegex.exec(line);
            if (isVar) {
                const [_, _quata, name, value] = isVar;

                current.values[`--${name}`] = value.trim();
            } else {
                const isName = isThemeNameRegex.exec(line);
                if (isName) {
                    const [_, _quata, name] = isName;

                    current = { name, values: {} };
                    rv.push(current);
                }
            }
        });

    rv = rv.filter((group) => Object.keys(group.values).length > 0);
    return rv;
}

export function parseTextAsCSSvars(text: string): FileThemeVars {
    const themes = parseTextToThemeVarsArray(text);

    const rv = themes.reduce((acc, theme) => {
        acc[theme.name] = theme.values;
        return acc;
    }, {} as FileThemeVars);
    
    return rv;
}
