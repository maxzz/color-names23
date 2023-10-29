// <":root": {> or <:root: {> or <"dark": {> or <.dark: {>
const isThemeNameRegex = /^\s*(['"])?([\.\:]?[a-zA-Z0-9\-]+)(?:['"])?\s*:?\s* \{\s*$/;

// <"--background": "224 71% 4%",> or <--background: 159 65% 4%;>
const isCSSVarRegex = /^\s*(['"])?--([a-zA-Z0-9\-]+)(?:['"])?\s*:\s*(?:['"])?([^;"']+)(?:['"])?\s*[;,]?\s*$/;

type ThemeVars = {
    name: string;
    values: Record<string, string>;
};

export function parseTextAsCSSvars(text: string): ThemeVars[] {
    let rv: ThemeVars[] = [];

    let current: ThemeVars = { name: 'root', values: {} };
    rv.push(current);

    text.split(/\r?\n/)
        .forEach((line) => {
            const asVar = isCSSVarRegex.exec(line);
            if (asVar) {
                const [_, _quata, name, value] = asVar;

                current.values[name] = value.trim();
            } else {
                const asName = isThemeNameRegex.exec(line);
                if (asName) {
                    const [_, _quata, name] = asName;

                    current = { name, values: {} };
                    rv.push(current);
                }
            }
        });

    rv = rv.filter((group) => Object.keys(group.values).length > 0);
    return rv;
}
